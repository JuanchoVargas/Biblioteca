import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
			path: "/",
			name: "home",
			component: () => import("@/views/home.vue"),
		},
    {
			path: "/autor",
			name: "autores",
			component: () => import("@/components/admin/autor/listar.vue"),
		},
    {
			name: "autor-editar",
			path: "/autor/editar/:id",
			component: () => import("@/components/admin/autor/gestionar.vue"),
		},
    {
			name: "autor-crear",
			path: "/autor/crear",
			component: () => import("@/components/admin/autor/gestionar.vue"),
		},
    {
			path: "/editorial",
			name: "editoriales",
			component: () => import("@/components/admin/editorial/listar.vue"),
		},
    {
			name: "editorial-editar",
			path: "/editorial/editar/:id",
			component: () => import("@/components/admin/editorial/editar.vue"),
		},
    {
			path: "/editorial/crear",
			name: "editorial-crear",
			component: () => import("@/components/admin/editorial/crear.vue"),
		},
    {
			path: "/libro",
			name: "libros",
			component: () => import("@/components/admin/libro/listar.vue"),
		},
    {
			name: "libro-editar",
			path: "/libro/editar/:id",
			component: () => import("@/components/admin/libro/editar.vue"),
		},
    {
			path: "/libro/crear",
			name: "libro-crear",
			component: () => import("@/components/admin/libro/crear.vue"),
		},
  ]
})
export default router
