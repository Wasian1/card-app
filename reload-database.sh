#!/usr/bin/env bash

echo "🔄 Reloading K-pop Card Game Database..."
echo "⚠️  This will destroy all existing data!"
read -p "Continue? (y/N): " -n 1 -r
echo

if [ "$REPLY" = "y" ] || [ "$REPLY" = "Y" ]; then
  echo "Dropping existing schema..."
  docker exec card-app-postgres psql -U card_admin -d card-app -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

  echo "Creating tables..."
  docker exec card-app-postgres psql -U card_admin -d card-app -f /docker-entrypoint-initdb.d/01-create-tables.sql

  echo "Adding indexes..."
  docker exec card-app-postgres psql -U card_admin -d card-app -f /docker-entrypoint-initdb.d/02-create-indexes.sql

  echo "Loading K-pop artists and cards..."
  docker exec card-app-postgres psql -U card_admin -d card-app -f /docker-entrypoint-initdb.d/03-seed-data.sql

  echo "Database reload complete"
  echo "K-Pop card game initial test data loaded"
else 
  echo "Database reload cancelled."
fi
