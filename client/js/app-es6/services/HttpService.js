export class HttpService {

  /*get(url) {
          return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
              xhr.open('GET' ,url);

              xhr.onreadystatechange = ()=> {
                    if (xhr.readyState == 4) {
                      
                      if(xhr.status == 200) {
                      resolve(JSON.parse(xhr.responseText))
                      } else {
                        reject(xhr.responseText);
                      }
                    }

              };

              xhr.send();
        });

  }

  post(dado, url) {

        return new Promise((resolve, reject) => {
          let xhr = new XMLHttpRequest();
          xhr.open("POST", url, true);
          xhr.setRequestHeader("Content-type", "application/json");
          xhr.onreadystatechange = ()=> {
            if(xhr.readyState == 4) {
              if(xhr.status == 200) {
                  resolve(JSON.parse(xhr.responseText));
              } else {
                reject(xhr.responseText);
              }
            }
          };
          xhr.send(JSON.stringify(dado));
        });
  }*/

    async get(url){
          return fetch(url)
                .then(res => this._handleErrors(res))
                .then(res => res.json());
      }

    async post(url,dado){
        return fetch(url,{
          headers:{"Content-type":"application/json"},
          method:'post',
          body:JSON.stringify(dado),
        }).then(res => this._handleErrors(res));
    } 

    _handleErrors(res){
        if(!res.ok) throw new Error(res.statusText);
        return res
        }


  }


         

