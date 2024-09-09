const $ = elemet => document.getElementById(elemet)
const $c = elemet => document.createElement(elemet)
const module = "citas/";
const formPath = "./form-citas.html";
const tablePath = './citas.html'
const apiUrl = 'https://backendmysql142.onrender.com/api/';

function showData() {
    let request = sendRequest(apiUrl, module, 'GET', '');
    const $TABLE = $('table-body-main');
    $TABLE.innerHTML = '';
    request.onload = function () {

        let data = request.response;
        data.forEach(data => {

            let {
                id,
                n_medico,
                especialidad,
                fecha,
                duracion,
                createdAt,
                updatedAt
            } = data;

            const $TR = $c('tr');
            const $TDBTN = $c('td');
            const $BTNEDIT = $c('button');
            const $BTNDEL = $c('button');

            $BTNEDIT.setAttribute("type", "button");
            $BTNEDIT.className = "btn btn-primary";
            $BTNEDIT.textContent = 'Editar';
            $BTNEDIT.onclick = () => {
                window.location = `${formPath}?id=${id}`
            };
            $BTNDEL.setAttribute("type", "button");
            $BTNDEL.className = "btn btn-secondary";
            $BTNDEL.textContent = 'Eliminar';
            $BTNDEL.onclick = () => {
                deleteReq(id);
            };

            $TDBTN.appendChild($BTNEDIT);
            $TDBTN.appendChild($BTNDEL);
            $TR.appendChild($TDBTN);

            let newData = [
                n_medico,
                especialidad,
                fecha,
                duracion];
            newData.forEach(d => {
                const $TD = $c('td');
                $TD.textContent = d;
                $TR.appendChild($TD);
            })
            $TABLE.appendChild($TR);
        });
        request.onerror = () => {
            $TABLE.innerHTML = `
            <tr>
                <td colspan="">error</td>
            </tr>
            `
        }
    }
}

function deleteReq(id) {
    let request = sendRequest(apiUrl, module + id, 'DELETE', '');
    request.onload = function () {
        showData();
    }
}

function saveReq(id) {

    let n_medico = $('n_medico');
    let especialidad = $('especialidad');
    let fecha = $('fecha');
    let duracion = $('duracion');

    let data = {
        'n_medico': n_medico.value,
        'especialidad': especialidad.value,
        'fecha': fecha.value,
        'duracion': duracion.value,
    }

    let request;
    if (id !== '') {
        request = sendRequest(apiUrl, module + id, 'PUT', data);
    } else {
        request = sendRequest(apiUrl, module, 'POST', data);
    }

    request.onload = function () {
        window.location = tablePath;
    }
    request.onerror = () => {
        alert("eror")
    }
}

function loadReq(id) {
    let request = sendRequest(apiUrl, module + id, 'GET', '');
    request.onload = function () {

        let data = request.response;
        $('n_medico').value = data.n_medico;
        $('especialidad').value = data.especialidad;
        $('fecha').value = data.fecha;
        $('duracion').value = data.duracion;

    }
}