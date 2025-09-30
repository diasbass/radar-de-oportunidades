import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import EmailService from './services/EmailService';

// Duplicamos a interface aqui para o worker ser independente
interface Opportunity {
  id: string;
  project: string;
  chain: string;
  symbol: string;
  apy: number;
  tvlUsd: number;
}

const prisma = new PrismaClient();
const emailService = new EmailService();

export async function checkAlerts() {
  console.log('--- Iniciando verificação de alertas ---');

  const activeAlerts = await prisma.alert.findMany({
    where: { isActive: true },
    include: { user: true },
  });

  if (activeAlerts.length === 0) {
    console.log('Nenhum alerta ativo para verificar. Encerrando ciclo.');
    return;
  }

  console.log(`Encontrados ${activeAlerts.length} alertas ativos.`);

  const { data } = await axios.get('https://yields.llama.fi/pools');
  const opportunities: Opportunity[] = data.data;

  for (const alert of activeAlerts) {
    const opportunity = opportunities.find(op => op.id === alert.opportunityId);

    if (!opportunity || !alert.user.email) {
      continue;
    }

    // Renomeamos para 'currentApy' para clareza
    const currentApy = opportunity.apy;
    const targetApy = alert.targetApy;

    if (currentApy > targetApy) {
      console.log(`ALERTA DISPARADO para o usuário ${alert.user.email}! Oportunidade: ${opportunity.project}, APY Atual: ${currentApy}%, Alvo: >${targetApy}%`);

      await emailService.sendAlertEmail({
        to: alert.user.email,
        projectName: opportunity.project,
        targetApy: targetApy,
        currentApy: currentApy,
      });

      await prisma.alert.update({
        where: { id: alert.id },
        data: { isActive: false },
      });

      console.log(`Alerta ${alert.id} desativado após notificação.`);
    }
  }

  console.log('--- Verificação de alertas concluída ---');
}

// --- BLOCO ADICIONADO ---
// Este código verifica se o arquivo está sendo executado diretamente
// e, em caso afirmativo, chama a função checkAlerts.
if (require.main === module) {
  checkAlerts().catch(e => {
    console.error('Ocorreu um erro no worker de alertas:', e);
    process.exit(1);
  });
}