== README
New With EE 2.8.1 + Re-structured Grunt

Folder veronica may be renamed. If you do pick a non obvious name.

Using Grunt with grunt watch to compile static files and compress images. Node modules need to be installed separately though.

To install expression engine from scratch, rename folder ______installer to installer. Remove folder installer before deploying to any server.

- Install instructions:
http://ellislab.com/expressionengine/user-guide/installation/installation.html

- Don't forget to set right permissions. Help script here:
https://github.com/quickshiftin/set-ee-perms

- Don't forget to add for bootstrap
/* End of file config.php */
/* Location: ./system/expressionengine/config/config.php */
require(realpath(dirname(__FILE__) . '/../../../config_bootstrap.php'));
At the end of config.php and database.php

- This is using a config bootstrap. Can found more about it here:
http://www.google.co.uk/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0CC8QFjAA&url=http%3A%2F%2Fee-garage.com%2Fnsm-config-bootstrap&ei=GeoEU9PlJ6Pe7Abs_oDoDA&usg=AFQjCNGRlt4W5_5XSc0FBVVETvDKulEgBQ&sig2=aRszmPqmQ10hdij1lN_WMw