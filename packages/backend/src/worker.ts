import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import EmailService from './services/EmailService';
import { Opportunity } from './services/api'; // Reutilizamos o tipo do frontend

const prisma = new PrismaClient();
const emailService = new EmailService();

// Esta é a função principal do nosso worker
export async function checkAlerts() {
  console.log('--- Iniciando verificação de alertas ---');

  // 1. Busca todos os alertas que estão ativos no nosso banco de dados
  const activeAlerts = await prisma.alert.findMany({
    where: { isActive: true },
    include: { user: true }, // Inclui os dados do usuário (para pegarmos o email)
  });

  if (activeAlerts.length === 0) {
    console.log('Nenhum alerta ativo para verificar. Encerrando ciclo.');
    return;
  }

  console.log(`Encontrados ${activeAlerts.length} alertas ativos.`);

  // 2. Busca os dados mais recentes de TODAS as oportunidades do DeFi Llama
  const { data } = await axios.get('https://yields.llama.fi/pools');
  const opportunities: Opportunity[] = data.data;

  // 3. Itera sobre cada alerta e verifica a condição
  for (const alert of activeAlerts) {
    // Encontra a oportunidade correspondente ao alerta
    const opportunity = opportunities.find(op => op.id === alert.opportunityId);

    // Se a oportunidade não existe mais ou não tem email, pulamos
    if (!opportunity || !alert.user.email) {
      continue;
    }

    const currentApy = opportunity.apy;
    const targetApy = alert.targetApy;

    // 4. A CONDIÇÃO: O APY atual ultrapassou o APY alvo do alerta?
    if (currentApy > targetApy) {
      console.log(`ALERTA DISPARADO para o usuário ${alert.user.email}! Oportunidade: ${opportunity.project}, APY Atual: ${currentApy}%, Alvo: >${targetApy}%`);

      // 5. Envia o email usando nosso EmailService
      await emailService.sendAlertEmail({
        to: alert.user.email,
        projectName: opportunity.project,
        targetApy: targetApy,
        currentApy: currentApy,
      });

      // 6. IMPORTANTE: Desativa o alerta para não spamar o usuário
      await prisma.alert.update({
        where: { id: alert.id },
        data: { isActive: false },
      });

      console.log(`Alerta ${alert.id} desativado após notificação.`);
    }
  }

  console.log('--- Verificação de alertas concluída ---');
}