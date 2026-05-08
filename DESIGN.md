# 📐 Sistema de Diseño: ALL — Control Total, Alivio Real

Este documento establece las bases visuales y estructurales para el rebranding del ecosistema **ALL** (anteriormente Orbi). La estética se alinea con el concepto de "Control Total" (precisión, software, gestión) y "Alivio Real" (limpieza, tranquilidad, resultados).

---

## 🎨 Paleta de Colores (Semantic Colors)

Colores calibrados para legibilidad y contraste premium.

| Token | Valor Hex | Uso Principal |
| :--- | :--- | :--- |
| `--primary` | `#2B4EFF` | Brand Blue, botones primarios, estados activos. |
| `--secondary` | `#1A1F3C` | Navy Corporativo, encabezados, fondos oscuros. |
| `--accent` | `#00D1FF` | Cyan sutil para micro-detalles y gradientes. |
| `--bg-main` | `#F8FAFC` | Fondo de página (Light Mode). |
| `--bg-surface` | `#FFFFFF` | Tarjetas, contenedores, inputs. |
| `--text-main` | `#1A1F3C` | Texto base (alta legibilidad). |
| `--text-muted` | `#64748B` | Texto secundario, descripciones. |
| `--border` | `#E2E8F0` | Líneas de división, bordes de inputs. |

---

## ✍️ Tipografía (Typography)

Basada en fuentes geométricas modernas que proyectan tecnología y confianza.

- **Encabezados (H1, H2, H3):** `Outfit` (Bold/SemiBold). Espaciado de letras sutilmente reducido (`-0.02em`).
- **Cuerpo (Body) y UI:** `Inter` (Regular/Medium). Optimizada para lectura de datos y paneles de gestión.

---

## 💎 Identidad Visual (Iconografía & Logo)

El logo se basa en la geometría del **cuadrado redondeado** y la simplicidad tipográfica.

- **Icono:** Rectángulo azul (`#2B4EFF`) con `rx="20"`. Texto "ALL" centrado en blanco.
- **Wordmark:** Tipografía `all` en minúsculas, peso 700, color `--secondary`.
- **Bordes:** Se utiliza un radio de curvatura (`border-radius`) de **16px** para tarjetas y **12px** para botones para suavizar la interfaz.

---

## 🌊 Efectos & Estética

- **Glassmorphism:** Uso moderado de desenfoque de fondo (`backdrop-filter: blur(12px)`) en headers y modales.
- **Sombras:** Sombras suaves y profundas (`box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05)`).
- **Micro-animaciones:** Transiciones de `200ms` con curva `cubic-bezier(0.4, 0, 0.2, 1)`.

---

## 🚀 Próximos Pasos

1. Aplicar estos tokens a `src/app/globals.css`.
2. Actualizar el Dashboard para usar la nueva paleta.
3. Rediseñar la sección Hero de la Landing Page con el nuevo Logo.
