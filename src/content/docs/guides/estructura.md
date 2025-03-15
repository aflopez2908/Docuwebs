---
title: "Funcionamiento de la Web"
description: "Guía completa sobre el funcionamiento de la web, sus componentes y cómo agregar nuevos enlaces."
---


## Fuente de Datos (JSON)

La aplicación utiliza archivos JSON para almacenar los recursos, que incluyen enlaces a documentación, APIs, herramientas y otros recursos útiles. Estos archivos están estructurados en categorías y subcategorías, y cada recurso cuenta con propiedades como:

- **nombre**
- **descripción**
- **URL**
- **imagen**

### Ejemplo de Archivo JSON

```json
{
  "macroCategoria": "Recursos API",
  "subcategorias": [
    {
      "subcategoria": "APIs Públicas",
      "links": [
        {
          "nombre": "API de Ejemplo",
          "url": "https://api.ejemplo.com",
          "descripcion": "Una API de ejemplo para desarrolladores.",
          "imagen": "https://api.apiflash.com/v1/urltoimage?access_key=Mykey&wait_until=page_loaded&url=https://api.ejemplo.com"
        }
      ]
    }
  ]
}
```
:::note
Las imágenes de vista previa de los recursos se generan automáticamente utilizando la API de [ApiFlash](https://www.apiflash.com/).  
Esta API captura capturas de pantalla de la URL asignada, permitiendo que cada tarjeta tenga una representación visual actualizada del sitio web correspondiente.
:::







## Componente `MacroCategory` (`section.astro`)

Este componente recibe los datos del JSON y organiza la información. Recorre cada macro categoría y, dentro de ellas, cada subcategoría para mapear y renderizar los recursos mediante la utilización del componente `Card`.

### Ejemplo de Código en `section.astro`

```astro
---
import StarlightPage from '@astrojs/starlight/components/StarlightPage.astro';
import Card from '../components/Card.astro';

interface Link {
  nombre: string;
  url: string;
  descripcion: string;
  imagen: string;
}

interface Subcategoria {
  subcategoria: string;
  links: Link[];
}

interface MacroCategoryData {
  macroCategoria: string;
  subcategorias: Subcategoria[];
}

interface Props {
  data: MacroCategoryData;
}

const { data } = Astro.props as Props;
const macroCategoria = data.macroCategoria;
const subcategorias = data.subcategorias;
---

<StarlightPage frontmatter={{ title: macroCategoria }}>
  <h1>{macroCategoria}</h1>
  {subcategorias.map((subcat) => (
    <>
      <h2>{subcat.subcategoria}</h2>
      <div class="container flex flex-wrap gap-4">
        {subcat.links.map((link) => (
          <Card
            nombre={link.nombre}
            image={link.imagen}
            description={link.descripcion}
            link={link.url}
          />
        ))}
      </div>
    </>
  ))}
</StarlightPage>
```

## Componente `Card` (`Card.astro`)

Cada recurso se muestra en forma de tarjeta interactiva. El componente `Card` se encarga de presentar la imagen, el nombre, la descripción y un enlace que redirige al usuario al recurso correspondiente. Además, incorpora efectos de hover y escalado para mejorar la experiencia visual.

### Ejemplo de Código en `Card.astro`

```astro
---
export interface Props {
  image: string;
  nombre: string;
  description: string;
  link: string;
}

const { image, description, link, nombre } = Astro.props;
---

<div class="bg-[var(--sl-color-background)] border border-[var(--sl-color-accent-low)] rounded-2xl shadow-lg p-4 max-w-xs text-center transform transition-all hover:scale-105 hover:shadow-xl">
  <img src={image} alt="Imagen de {nombre}" class="w-full h-40 object-cover rounded-t-lg" />
  <div class="p-4">
    <h3 class="font-bold text-lg">{nombre}</h3>
    <p class="text-[var(--sl-color-text)] mb-3">{description}</p>
    <a href={link} target="_blank" class="inline-block bg-[var(--sl-color-accent)] text-[var(--sl-color-background)] font-semibold px-4 py-2 rounded-lg hover:bg-[var(--sl-color-accent-high)] transition">
      Ver más
    </a>
  </div>
</div>
```

## `StarlightPage` Component

Para mantener una estructura y un diseño coherentes en toda la documentación, se utiliza el componente `StarlightPage`. Este envuelve el contenido principal, heredando los estilos y layouts predefinidos de la plantilla Starlight, garantizando una apariencia uniforme en todas las páginas.

### Ejemplo de Uso

```astro
<StarlightPage frontmatter={{ title: 'Título de la Página' }}>
  <!-- Contenido principal de la página -->
</StarlightPage>
```

## Actualización Dinámica

Cuando se modifican o agregan recursos en los archivos JSON, la web se actualiza automáticamente. Esto se debe a que el componente `MacroCategory` vuelve a mapear los datos y renderiza las tarjetas correspondientes sin necesidad de realizar cambios adicionales en el código.

### Ejemplo de Integración

```astro
---
import MacroCategory from '../components/section.astro';
import data from '../info/APIS.json';
---

<MacroCategory data={data} />
```

Cada vez que se actualiza el archivo JSON (`APIS.json`), el componente `MacroCategory` procesa los nuevos datos y renderiza las tarjetas actualizadas.

## Integración y Escalabilidad

Gracias a la utilización de Astro, es posible combinar contenido en Markdown/MDX con componentes interactivos. Esto permite que la documentación sea fácil de mantener y escalar, facilitando la adición de nuevas secciones o funcionalidades conforme la colección de recursos crece.

### Ejemplo de Combinar Markdown con Componentes

```astro
---
import MacroCategory from '../components/section.astro';
import data from '../info/APIS.json';
---

# Bienvenido a la Biblioteca de Links

Esta es la documentación de la web, donde se centralizan los recursos para desarrolladores.

<MacroCategory data={data} />
```

Este ejemplo demuestra cómo se puede integrar el contenido escrito en Markdown con componentes interactivos para crear una documentación dinámica y actualizable.

