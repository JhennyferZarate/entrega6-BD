export const config = {
  mariaDB:{
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'ecommerce'
    }
  },
  sqlite3:{
    client: 'sqlite3',
    connection: { 
      filename: './ecommerce.sqlite'
    },
    useNullAsDefault: true
  }
}