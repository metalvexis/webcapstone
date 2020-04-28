echo "Deploying Capstone Web"

yarn build

rm -rf /var/www/capstone

mkdir /var/www/capstone

cp -R ~/capstone/webcapstone/build/* /var/www/capstone

echo "Deployment Complete"
