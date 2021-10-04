const fetcher = async (query : string, data?: any, headers?: any ) =>  await fetch(`${process.env.URL || ""}/api/graphql`, {
    method:'post',
    headers: {
        'Content-Type': 'application/json',
        ...headers
    },
    body: JSON.stringify({
        query,
        variables : {input : data}
    })
    })
    .then( res=> res.json())
    .then( json => json.data)
    
    
    
export default fetcher