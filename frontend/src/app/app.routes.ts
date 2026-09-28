import { Routes } from '@angular/router';
import { adminGuard } from './core/admin.guard';
import { pageTitles } from './data/site';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shell/shell').then((m) => m.Shell),
    children: [
      { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home), data: { title: pageTitles['home'] } },
      { path: 'election', loadComponent: () => import('./pages/election/election').then((m) => m.Election), data: { title: pageTitles['election'] } },
      { path: 'voters', loadComponent: () => import('./pages/voters/voters').then((m) => m.Voters), data: { title: pageTitles['voters'] } },
      { path: 'about', loadComponent: () => import('./pages/about/about').then((m) => m.About), data: { title: pageTitles['about'] } },
      { path: 'news', loadComponent: () => import('./pages/news/news-list').then((m) => m.NewsList), data: { title: pageTitles['news'] } },
      { path: 'news/:id', loadComponent: () => import('./pages/news/news-detail').then((m) => m.NewsDetail), data: { title: pageTitles['news'] } },
      { path: 'gallery', loadComponent: () => import('./pages/gallery/gallery-list').then((m) => m.GalleryList), data: { title: pageTitles['gallery'] } },
      { path: 'problems', loadComponent: () => import('./pages/problems/problems').then((m) => m.Problems), data: { title: pageTitles['problems'] } },
      { path: 'contact', loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact), data: { title: pageTitles['contact'] } },
    ],
  },
  { path: 'admin/login', loadComponent: () => import('./pages/admin/login').then((m) => m.AdminLogin) },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/admin/admin-shell').then((m) => m.AdminShell),
    children: [
      { path: '', loadComponent: () => import('./pages/admin/admin-home').then((m) => m.AdminHome) },
      { path: 'problems', loadComponent: () => import('./pages/admin/admin-problems').then((m) => m.AdminProblems) },
      { path: 'news', loadComponent: () => import('./pages/admin/admin-news').then((m) => m.AdminNews) },
      { path: 'voters', loadComponent: () => import('./pages/admin/admin-voters').then((m) => m.AdminVoters) },
    ],
  },
  { path: '**', redirectTo: '' },
];
