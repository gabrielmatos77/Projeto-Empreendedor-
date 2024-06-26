import { PDFDownloadLink, StyleSheet, Text, View, Document, Page } from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import { RecordModel } from 'pocketbase';
import { Suspense } from 'react';
import { getProducao } from '../../../../api/get_prod';

const style = StyleSheet.create({
  page: {
    fontSize: '12px'
  },
  line: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

const MyDoc = ({ data }: { data: RecordModel[] }) => (
  <Document>
    <Page style={style.page}>
      <View style={style.line}><Text>RELATORIO PARADAS</Text></View>
      {data.slice(0, 150).map((e) => <View style={style.line}>
        <Text>Produzido: {e.tipo_par}</Text>
        <Text>Rejeito: {e.rejeito}</Text>
        <Text>Inicio: {e.created}</Text>
        <Text>Fim: {e.fim}</Text>
      </View>)}
    </Page>
  </Document>
);

export const ProdButton = ({ maquina, date }: { date: string, maquina: string }) => {
  const { data, status } =
    useQuery(
      {
        queryKey: ['paradas'],
        queryFn: () => getProducao(maquina, date)
      })
  console.log(data)
  return status !== 'success' ? null : (
    <div>
      <Suspense fallback="loading">
        <PDFDownloadLink document={<MyDoc data={data} />} fileName="somename.pdf">
          {({ loading }) =>
            loading ? 'Loading document...' : 'Baixar Documento Do Dia: ' + date
          }
        </PDFDownloadLink>
      </Suspense>
    </div>
  )
};
