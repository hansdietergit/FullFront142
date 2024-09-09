const $ = elemet => document.getElementById(elemet)
const $c = elemet => document.createElement(elemet)
const module = "formulas/";
const formPath = "./form-formulas.html";
const tablePath = './formulas.html'
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
                farmaco,
                cantidad,
                estado,
                observaciones,
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
                farmaco,
                cantidad,
                estado,
                observaciones];
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

    let farmaco = $('farmaco');
    let cantidad = $('cantidad');
    let estado = $('estado');
    let observaciones = $('observaciones');
    
    let data = {
        'farmaco': farmaco.value,
        'cantidad': cantidad.value,
        'estado': estado.value,
        'observaciones': observaciones.value,
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
        $('farmaco').value = data.farmaco;
        $('cantidad').value = data.cantidad;
        $('estado').value = data.estado;
        $('observaciones').value = data.observaciones;

    }
}