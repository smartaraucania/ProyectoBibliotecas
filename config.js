module.exports = {
    'port': process.env.PORT || 3000,
    'db':  process.env.MONGODB ||'mongodb://db/bibliotecas',
    'secret':'b1bl10t3c4st0k3ns1cr3et', //pass secreta para generar token
}

/*            'mongodb://db/bibliotecas',                    */
/*            'mongodb://mongo/bibliotecas',                 */
/*         'mongodb://localhost:27017/bibliotecas',          */ 