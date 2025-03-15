// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';


// https://astro.build/config
export default defineConfig({
  integrations: [
      starlight({
          title: 'Docu Web',
          customCss:['./src/styles/custom.css'],
          sidebar: [
              {
                  label: 'Cambios',
                  items: [
                      // Each item here is one entry in the navigation menu.
                      { label: 'Example Guide', slug: 'guides/example' },
                      { label: 'Estructura', slug: 'guides/estructura' }
                  ],
              },
                {
                    label: "Extras",
                    items: [
                      { label: "Front", link: "/front/" },
                      { label: "APIS", link: "/apis/" },
                      { label: "Automatizacion", link: "/automatizacion/" },
                      { label: "Low code", link: "/lowcode/" },
                      { label: "Studies", link: "/studies/" },
                      { label: "Toosl", link: "/tools/" },
                      
                      

                    ]
                  
                  },
          ],
      }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});