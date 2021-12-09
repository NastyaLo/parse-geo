import { useCallback, useState } from "react";
import process from './process';

function ParseGeoUI () {
    const [fileName, setFileName] = useState('geo-data');

    const processData = useCallback(async () => {
        const elem = document.getElementById('data');
        const converted = await process(elem.value);

        const blob = new Blob([converted], {type: 'text/csv'});
        const link = document.createElement('a');

        link.href = window.URL.createObjectURL(blob);
        link.download = `${fileName}.csv`;
        link.click();
    }, [fileName]);

    return <div>
        <label htmlFor="filename">
            имя файла желаемое (применяется автоматом)<br/>
            <input value={fileName} onChange={(e) => { setFileName(e.target.value); }}/>
        </label>
        <br/>
        <br/>
        <label htmlFor="data">
            <span>Вставь в поле данные и нажми кнопку</span><br/>
            <textarea id="data"></textarea>
        </label>
        <br/>
        <br/>
        <br/>
        <button onClick={() => { processData() }}>Тык чтобы скачать резалт</button>        
    </div>
}

export default ParseGeoUI;