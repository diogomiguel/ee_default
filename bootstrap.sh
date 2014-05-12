#!/usr/bin/env bash

apt-get update
apt-get install -y lamp-server^
rm -rf /var/www
ln -fs /vagrant /var/www
sudo mv /etc/php5/apache2/php.ini /etc/php5/apache2/php.ini.bak
sudo cp -s /usr/share/doc/php5-common/examples/php.ini-development /etc/php5/apache2/php.ini
apt-get install -y phpmyadmin
sudo /etc/init.d/apache2 restart
sudo chown -R $USER:$USER /var/www

#missing tasks:

#Include phpMyAdmin Apache
#sudo nano /etc/apache2/apache2.conf
#Include /etc/phpmyadmin/apache.conf

#Create new virtaul host or change the default one

#DUMP Database
#mysql -u root -p -h localhost
#mysql> create database foo;
#mysql> exit;