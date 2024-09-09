
function sendRequest(apiUrl, endPoint, method, data) {
    
    let request = new XMLHttpRequest();
    
    request.open(method, apiUrl+endPoint);
    request.responseType="json";
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(data?JSON.stringify(data):data)
    
    return request;
}