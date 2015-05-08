/**
 * Config minimale pour lancer un serveur Livereload avec Gulp.
 *
 * # Installation
 *
 * - Sur chaque poste :
 *     - Supprimez le package livereload sur Sublime Text (pour éviter les conflits)
 *     - Installez node / npm
 *     - Installez gulp (dans le terminal : sudo npm install -g gulp)
 *
 * - Pour chaque projet :
 *     - Dans le terminal, placez-vous dans votre projet
 *         (sous OSX, vous pouvez glissez le répertoire sur l'icône du terminal)
 *     - Installez gulp (dans le terminal : sudo npm install gulp)
 *     - Installez tiny-lr (dans le terminal : sudo npm install tiny-lr)
 *     - Copiez ce fichier à la racine de votre projet et nommez-le 'gulpfile.js'
 *     - Modifiez la variable "paths" de ce fichier pour inclure votre css/html
 *         (si besoin, par défaut tout le projet est observé)
 *
 * # Utilisation :
 *
 * - Dans le terminal, placez-vous dans votre projet
 *     (sous OSX, vous pouvez glissez le répertoire sur l'icône du terminal)
 * - Dans le terminal, lancez la commande "gulp"
 * - Activez livereload dans le navigateur
 */

var tinylr;

var gulp  = require('gulp');

// Liste des chemins à observer  depuis la racine du projet (css/html/images/...)
var paths = [
    'css/*.css',
    'js/*.js',
    'index.php',
];

gulp.task('default', ['livereload']);

function notifyLiveReload(event) {
    var fileName = require('path').relative(__dirname, event.path);

    tinylr.changed({
        body: {
          files: [fileName]
        }
    });
}

gulp.task('livereload', ['watch'], function() {
    tinylr = require('tiny-lr')();
    tinylr.listen(35729);
});

gulp.task('watch', function() {

    for (var i in paths) {
        gulp.watch(paths[i], notifyLiveReload);
    }
});
