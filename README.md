# 📸 PhotoAI Studio

Profesjonalna aplikacja do generowania zdjęć produktowych za pomocą GPT-image-1 (OpenAI).

## 🚀 Wdrożenie na Vercel (5 minut)

### Opcja A — przez GitHub (polecane)

1. Utwórz konto na [github.com](https://github.com) jeśli nie masz
2. Kliknij **New repository** → nazwij np. `photoai-studio`
3. Wgraj wszystkie pliki z tego folderu do repozytorium
4. Idź na [vercel.com](https://vercel.com) → zaloguj się przez GitHub
5. Kliknij **New Project** → wybierz swoje repozytorium
6. Vercel automatycznie wykryje Vite — kliknij **Deploy**
7. Za ~60 sekund masz live URL! 🎉

### Opcja B — przez Vercel CLI

```bash
# Zainstaluj Vercel CLI
npm install -g vercel

# W folderze projektu
npm install
vercel

# Postępuj za instrukcjami, potem:
vercel --prod
```

### Opcja C — przez StackBlitz (natychmiast, bez instalacji)

1. Idź na [stackblitz.com](https://stackblitz.com)
2. Kliknij **Start new project** → **Vite + React**
3. Zastąp `src/App.jsx` zawartością pliku `src/App.jsx`
4. Gotowe! Możesz też kliknąć **Connect to GitHub** i potem wdrożyć na Vercel.

---

## 💻 Uruchomienie lokalnie

```bash
npm install
npm run dev
# Otwórz http://localhost:5173
```

## 🔑 Klucz API

Wklej swój klucz OpenAI w interfejsie aplikacji. Klucz jest przechowywany tylko w przeglądarce.

Potrzebujesz dostępu do:
- `gpt-image-1` (zalecane) — https://platform.openai.com/api-keys
- lub `dall-e-2` (fallback, działa automatycznie)

---

## ✨ Funkcje

- 8 rodzajów ujęć produktowych (GPT-4o + Lifestyle)
- 5 stylów fotograficznych
- 6 typów tła/otoczenia  
- 3 proporcje kadru (1:1, 4:5, 16:9)
- Pobieranie PNG
- Drag & drop upload
- Pasek postępu w czasie rzeczywistym
- Responsywny design (desktop + mobile)
