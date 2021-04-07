import 'whatwg-fetch';

class HttpService {
    getOutput = () => {
        var promise = new Promise((resolve,reject) => {
            
            //fetch('http://localhost:3004/doo')
            fetch('http://localhost:8080/tickets')
            .then(response => {
                //console.log(response.json());
                resolve(response.json());
                //console.log(response);
                //resolve(response);
            })
        })
        
        return promise;
    }
}

export default HttpService;