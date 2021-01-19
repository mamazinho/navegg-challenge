 challenge.factory('HttpFctr', function WsHttp($q, $http) {
    return function(apiUrl, method, infos){
        var q = $q.defer()
        infos = typeof infos == 'object' ? infos : {}
        params = typeof infos.params == 'object' ? infos.params : {}
        $http({
            url: `/api/${apiUrl}/`,
            method: method,
            withCredentials: true,
            params: params,
            data: infos.data,
            responseType: 'json',
            headers: {  
                'Content-Type': infos.noContentType ? undefined : 'application/json',
            },
            timeout: q.promise,
        }).then(
            function(response){
                q.resolve(response.data)
            },
            function(error){
                if(error.xhrStatus != 'abort' && (error.data && !error.data.messages))
                    console.error('HttpFctr HTTP ERROR >> ',JSON.stringify(error))
                if(error.data && error.data.messages){
                    for(var x =0; x< error.data.messages.length; x++){
                        window.messages.error(error.data.messages[x])
                    }
                }
                q.reject(error)
            }
        )
        return q.promise
    }
})
 