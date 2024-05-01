const app = Vue.createApp({
  data() {
    return {
      titulo: 'Carrito de compras Vue',
      productos: [],
      productosCarrito: [],
      total: 0,
      mostrarCarrito: false
    };
  },
  methods: {
    getJSON() {
      console.log("GET");
      fetch('api/products.json')
        .then(response => response.json())
        .then(data => {
          this.productos = data.data.productos;
          console.log(data.data.productos);

          const storedProducts = localStorage.getItem('productosCarrito');
          if (storedProducts) {
            this.productosCarrito = JSON.parse(storedProducts);
            this.calcularTotal();
          }
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
    },
    toggleCarrito() {
      this.mostrarCarrito = !this.mostrarCarrito; 
    },
    agregarAlCarrito(producto) {
      this.productosCarrito.push(producto);
      this.calcularTotal();
      this.guardarProductosEnLocalStorage();
    },
    eliminarDelCarrito(index) {
      this.productosCarrito.splice(index, 1);
      this.calcularTotal();
      this.guardarProductosEnLocalStorage(); 
    },
    calcularTotal() {
      this.total = this.productosCarrito.reduce((total, producto) => {
        return total + producto.precio;
      }, 0);
    },
    guardarProductosEnLocalStorage() {
      localStorage.setItem('productosCarrito', JSON.stringify(this.productosCarrito));
    }
  },
  created() {
    this.getJSON();
  }
});

app.mount('#app');
