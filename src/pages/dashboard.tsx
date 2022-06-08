import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import dynamic from 'next/dynamic';

// Importando de maneira dinâmica e desativando o SSR
// Chart só será carregado pelo lado do cliente (browser)
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const localeConfig = {
  name: 'pt-BR',
  options: {
    months: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembo',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    shortMonths: [
      'Jan',
      'Feb',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    days: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ],
    shortDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    toolbar: {
      exportToSVG: 'Download SVG',
      exportToPNG: 'Download PNG',
      menu: 'Menu',
      selection: 'Selection',
      selectionZoom: 'Selection Zoom',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      pan: 'Panning',
      reset: 'Reset Zoom',
    },
  },
};

// Estilos do gráfico
const options = {
  chart: {
    locales: [localeConfig],
    defaultLocale: 'pt-BR',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    labels: {
      format: 'dd MMM',
    },
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-03-18T00:00:00.000Z',
      '2021-04-03T00:00:00.000Z',
      '2021-05-04T00:00:00.000Z',
      '2021-06-05T00:00:00.000Z',
      '2021-07-06T00:00:00.030Z',
      '2021-08-07T00:00:00.030Z',
      '2021-09-08T00:00:00.030Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [
  {
    name: 'series1',
    data: [31, 120, 10, 28, 61, 18, 109],
  },
];

export default function Dashboard() {
  return (
    <Flex direction='column' h='100vh'>
      <Header />

      <Flex width='100%' my='6' maxWidth='1480' mx='auto' px='6'>
        <Sidebar />

        <SimpleGrid flex='1' gap='4' minChildWidth='320px' align='flex-start'>
          <Box p='8' bg='gray.800' borderRadius={8} pb='4'>
            <Text fontSize='lg' mb='4'>
              Inscritos da semana
            </Text>
            <Chart options={options} series={series} type='area' height={160} />
          </Box>

          <Box p='8' bg='gray.800' borderRadius={8}>
            <Text fontSize='lg' mb='4'>
              Taxa de abertura
            </Text>
            <Chart options={options} series={series} type='area' height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
