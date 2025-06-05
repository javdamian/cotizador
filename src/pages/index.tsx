import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Drawer,
  IconButton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

type Producto = {
  _id: string;
  nombre: string;
  sku: string;
  descripcion: string;
  categoria: string;
  precioBase: number;
  especificaciones: any;
  cantidad?: number;
};

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [comision, setComision] = useState<number | null>(null);
  const [openCarrito, setOpenCarrito] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.sku.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarAlCarrito = (producto: Producto) => {
    const idx = carrito.findIndex(p => p._id === producto._id);
    if (idx !== -1) {
      setCarrito(carrito =>
        carrito.map((p, i) =>
          i === idx ? { ...p, cantidad: (p.cantidad || 1) + 1 } : p
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    setOpenCarrito(true);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.3rem', sm: '2rem' } }}>
        Productos de Audífonos
      </Typography>
      <TextField
        label="Buscar por nombre, SKU o categoría"
        variant="outlined"
        fullWidth
        margin="normal"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />
      <TableContainer component={Paper} sx={{ maxWidth: '100vw', overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell align="center">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productosFiltrados.map(producto => (
              <TableRow key={producto._id}>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.sku}</TableCell>
                <TableCell>{producto.categoria}</TableCell>
                <TableCell>${producto.precioBase}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => agregarAlCarrito(producto)}
                  >
                    Añadir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {productosFiltrados.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No se encontraron productos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Botón flotante para abrir el carrito */}
      <IconButton
        color="primary"
        sx={{
          position: 'fixed',
          bottom: { xs: 16, sm: 32 },
          right: { xs: 16, sm: 32 },
          zIndex: 1300,
          p: { xs: 1, sm: 2 },
        }}
        onClick={() => setOpenCarrito(true)}
      >
        <ShoppingCartIcon fontSize="large" />
      </IconButton>

      {/* Drawer lateral para el carrito */}
      <Drawer
        anchor="right"
        open={openCarrito}
        onClose={() => setOpenCarrito(false)}
        PaperProps={{
          sx: {
            width: { xs: '100vw', sm: 400 },
            maxWidth: '100vw',
            p: 3,
          },
        }}
      >
        <div>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
          >
            Cotización
          </Typography>
          {carrito.length === 0 ? (
            <Typography variant="body1">El carrito está vacío.</Typography>
          ) : (
            <>
              <TableContainer sx={{ maxWidth: '100vw', overflowX: 'auto' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Precio Base</TableCell>
                      <TableCell>Cantidad</TableCell>
                      <TableCell>Subtotal</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {carrito.map((producto, idx) => (
                      <TableRow key={producto._id}>
                        <TableCell>{producto.nombre}</TableCell>
                        <TableCell>${producto.precioBase}</TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            size="small"
                            value={producto.cantidad || 1}
                            inputProps={{ min: 1 }}
                            onChange={e => {
                              const cantidad = Math.max(1, Number(e.target.value));
                              setCarrito(carrito =>
                                carrito.map((p, i) =>
                                  i === idx ? { ...p, cantidad } : p
                                )
                              );
                            }}
                            style={{ width: 60 }}
                          />
                        </TableCell>
                        <TableCell>
                          ${(producto.cantidad || 1) * producto.precioBase}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Resumen */}
              <Typography variant="h6" sx={{ mt: 2 }}>
                Subtotal: $
                {carrito.reduce(
                  (acc, p) => acc + (p.cantidad || 1) * p.precioBase,
                  0
                ).toFixed(2)}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Comisión del Vendedor: $
                {comision !== null ? comision.toFixed(2) : '—'}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={async () => {
                  const subtotal = carrito.reduce(
                    (acc, p) => acc + (p.cantidad || 1) * p.precioBase,
                    0
                  );
                  const res = await fetch('http://localhost:3001/api/comision', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ subtotal }),
                  });
                  const data = await res.json();
                  setComision(data.comision);
                }}
              >
                Calcular Comisión
              </Button>
            </>
          )}
        </div>
      </Drawer>
    </Container>
  );
}