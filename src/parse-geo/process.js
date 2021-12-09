import { parseStringPromise as parseXML } from 'xml2js';
import { parse as toCSV } from 'json2csv';

async function process (data) {
   try {
    const jsonData = await parseXML(data);

    const coordsMeta = jsonData.gpx.wpt;
    const resultObj = [];

    coordsMeta.forEach(({ $: { lat, lon }, ele, name, time }) => {
        resultObj.push({ lat, lon, ele: ele.join('|'), name: name.join('|'), time: time.join('|') })
    });

    return toCSV(resultObj);
   } catch (e) {
        return `Произошла вот такая ошибка ${e.message}. Отправь ее Насте :)`;
   }
}

export default process;