instance_ids=# Obtener la lista de instancias en estado SHUTOFF y reiniciarlas
instance_ids=$(microstack.openstack server list --status SHUTOFF -f value -c ID)

for instance_id in $instance_ids; do
    echo "Iniciando la instancia $instance_id"
    microstack.openstack server start "$instance_id"
done
