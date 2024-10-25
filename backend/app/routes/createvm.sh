#!/bin/bash

# Variables
MACHINE_NAME="$1"   # Nombre de la máquina (primer parámetro)
FLAVOR="$2"         # Flavor (segundo parámetro)
IMAGE="$3"          # Imagen (tercer parámetro)
BRIDGE_INTERFACE="eno1"  # Interfaz de salida

# 1. Crear la máquina virtual
echo "Launching server..."
LAUNCH_OUTPUT=$(microstack launch -f $FLAVOR -n $MACHINE_NAME $IMAGE)

# 2. Extraer la IP desde el output de la creación
VM_IP=$(echo "$LAUNCH_OUTPUT" | grep -oP '(?<=@)\d+\.\d+\.\d+\.\d+')

if [ -z "$VM_IP" ]; then
  echo "Error: No se pudo encontrar la IP de la máquina."
  exit 1
fi

# 3. Generar un puerto aleatorio válido entre 1024 y 65535, evitando el puerto 2222
while true; do
  EXTERNAL_PORT=$((RANDOM % 64512 + 1024))
  if [ "$EXTERNAL_PORT" -ne 2222 ]; then
    break
  fi
done

# 4. Configurar Port Forwarding con iptables
echo "Configurando iptables para la máquina con IP $VM_IP en el puerto $EXTERNAL_PORT..."

# Redirigir tráfico SSH externo en el puerto $EXTERNAL_PORT hacia la IP de la máquina en el puerto 22
sudo iptables -t nat -A PREROUTING -i $BRIDGE_INTERFACE -p tcp --dport $EXTERNAL_PORT -j DNAT --to-destination $VM_IP:22

# Permitir el tráfico hacia la IP de la VM en el puerto 22
sudo iptables -A FORWARD -p tcp -d $VM_IP --dport 22 -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT

# Guardar las reglas de iptables (para que se mantengan tras reiniciar)
#sudo iptables-save > /etc/iptables/rules.v4

# 5. Mostrar solo el puerto final asignado
echo "$EXTERNAL_PORT"
