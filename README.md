# Cotizador de Audífonos (Frontend)

Cotizador de Audífonos es una herramienta web que permite a vendedores buscar productos de la industria de audífonos, agregarlos a una cotización, editar cantidades y calcular automáticamente la comisión del vendedor según el subtotal. El sistema utiliza Next.js, React, TypeScript, Material-UI y TailwindCSS.

## Casos de Uso

1. **Buscar productos:** El vendedor puede buscar productos por nombre, SKU o categoría.
2. **Agregar al carrito:** El vendedor selecciona productos y los añade al carrito/cotización.
3. **Editar cantidades:** Puede modificar la cantidad de cada producto (mínimo 1).
4. **Ver resumen:** Se muestra el subtotal y, al presionar un botón, se calcula la comisión del vendedor usando una lógica definida en el backend.

## Interfaces y Modelos

### TypeScript (Frontend)

```ts
type Producto = {
  _id: string;
  nombre: string;
  sku: string;
  descripcion: string;
  categoria: string;
  precioBase: number;
  especificaciones: any;
  cantidad?: number; // Solo en frontend para cotización
};
```

## Endpoints Consumidos

- `GET /api/products` — Obtener todos los productos.
- `POST /api/comision` — Calcular la comisión del vendedor (envía `{ subtotal }` en el body).

> **Nota:** El backend debe estar corriendo en `http://localhost:3001`.

## Getting Started

Para comenzar con el proyecto Cotizador, sigue estos pasos:

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/javdamian/cotizador.git
   cd Cotizador
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

3. **Ejecuta el servidor de desarrollo:**
   ```sh
   npm run dev
   ```

4. **Abre tu navegador:**
   Navega a `http://localhost:3000` para ver la aplicación.

## Folder Structure

```
Cotizador
├── src
│   ├── components        # Componentes reutilizables de React
│   ├── pages             # Páginas de Next.js
│   ├── styles            # Estilos globales
│   └── types             # Tipos e interfaces de TypeScript
├── public                # Recursos estáticos
├── tailwind.config.js    # Configuración de TailwindCSS
├── postcss.config.js     # Configuración de PostCSS
├── next.config.js        # Configuración de Next.js
├── tsconfig.json         # Configuración de TypeScript
├── package.json          # Configuración de npm
└── README.md             # Documentación del proyecto
```

## Contributing

¡Las contribuciones son bienvenidas! Si tienes sugerencias para mejoras o nuevas funcionalidades, por favor abre un issue o envía un pull request.

## License

Este proyecto está licenciado bajo la MIT License. Consulta el archivo LICENSE para más detalles.