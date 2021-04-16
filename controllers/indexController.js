
import connection from './db';

class IndexController {
  // Get all students
  static getAll(req, res) {
    connection.query('SELECT * FROM todos WHERE userId = ?', [1], function(error, results, fields) {
      console.log('Resultado lista:', results);
      return res.render('index', { name: 'ToDos', todos: results });
    });
  }
}
export default IndexController;
