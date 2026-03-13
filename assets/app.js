      "use strict";

      /* ══════════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════════ */
      const SURAH_LENGTHS = {
        1: 7,
        2: 286,
        3: 200,
        4: 176,
        5: 120,
        6: 165,
        7: 206,
        8: 75,
        9: 129,
        10: 109,
        11: 123,
        12: 111,
        13: 43,
        14: 52,
        15: 99,
        16: 128,
        17: 111,
        18: 110,
        19: 98,
        20: 135,
        21: 112,
        22: 78,
        23: 118,
        24: 64,
        25: 77,
        26: 227,
        27: 93,
        28: 88,
        29: 69,
        30: 60,
        31: 34,
        32: 30,
        33: 73,
        34: 54,
        35: 45,
        36: 83,
        37: 182,
        38: 88,
        39: 75,
        40: 85,
        41: 54,
        42: 53,
        43: 89,
        44: 59,
        45: 37,
        46: 35,
        47: 38,
        48: 29,
        49: 18,
        50: 45,
        51: 60,
        52: 49,
        53: 62,
        54: 55,
        55: 78,
        56: 96,
        57: 29,
        58: 22,
        59: 24,
        60: 13,
        61: 14,
        62: 11,
        63: 11,
        64: 18,
        65: 12,
        66: 12,
        67: 30,
        68: 52,
        69: 52,
        70: 44,
        71: 28,
        72: 28,
        73: 20,
        74: 56,
        75: 40,
        76: 31,
        77: 50,
        78: 40,
        79: 46,
        80: 42,
        81: 29,
        82: 19,
        83: 36,
        84: 25,
        85: 22,
        86: 17,
        87: 19,
        88: 26,
        89: 30,
        90: 20,
        91: 15,
        92: 21,
        93: 11,
        94: 8,
        95: 8,
        96: 19,
        97: 5,
        98: 8,
        99: 8,
        100: 11,
        101: 11,
        102: 8,
        103: 3,
        104: 9,
        105: 5,
        106: 4,
        107: 7,
        108: 3,
        109: 6,
        110: 3,
        111: 5,
        112: 4,
        113: 5,
        114: 6,
      };
      const EN_TR = 20,
        BN_TR = 161,
        EN_TF = 169,
        BN_TF = 164;
      const BASE = "https://api.quran.com/api/v4";

      const SURAH_NAMES = [
        "Al-Fatihah",
        "Al-Baqarah",
        "Ali 'Imran",
        "An-Nisa",
        "Al-Ma'idah",
        "Al-An'am",
        "Al-A'raf",
        "Al-Anfal",
        "At-Tawbah",
        "Yunus",
        "Hud",
        "Yusuf",
        "Ar-Ra'd",
        "Ibrahim",
        "Al-Hijr",
        "An-Nahl",
        "Al-Isra",
        "Al-Kahf",
        "Maryam",
        "Ta-Ha",
        "Al-Anbya'",
        "Al-Hajj",
        "Al-Mu'minun",
        "An-Nur",
        "Al-Furqan",
        "Ash-Shu'ara",
        "An-Naml",
        "Al-Qasas",
        "Al-'Ankabut",
        "Ar-Rum",
        "Luqman",
        "As-Sajdah",
        "Al-Ahzab",
        "Saba'",
        "Fatir",
        "Ya-Sin",
        "As-Saffat",
        "Sad",
        "Az-Zumar",
        "Ghafir",
        "Fussilat",
        "Ash-Shuraa",
        "Az-Zukhruf",
        "Ad-Dukhan",
        "Al-Jathiyah",
        "Al-Ahqaf",
        "Muhammad",
        "Al-Fath",
        "Al-Hujurat",
        "Qaf",
        "Adh-Dhariyat",
        "At-Tur",
        "An-Najm",
        "Al-Qamar",
        "Ar-Rahman",
        "Al-Waqi'ah",
        "Al-Hadid",
        "Al-Mujadila",
        "Al-Hashr",
        "Al-Mumtahanah",
        "As-Saf",
        "Al-Jumu'ah",
        "Al-Munafiqun",
        "At-Taghabun",
        "At-Talaq",
        "At-Tahrim",
        "Al-Mulk",
        "Al-Qalam",
        "Al-Haqqah",
        "Al-Ma'arij",
        "Nuh",
        "Al-Jinn",
        "Al-Muzzammil",
        "Al-Muddaththir",
        "Al-Qiyamah",
        "Al-Insan",
        "Al-Mursalat",
        "An-Naba'",
        "An-Nazi'at",
        "'Abasa",
        "At-Takwir",
        "Al-Infitar",
        "Al-Mutaffifin",
        "Al-Inshiqaq",
        "Al-Buruj",
        "At-Tariq",
        "Al-A'la",
        "Al-Ghashiyah",
        "Al-Fajr",
        "Al-Balad",
        "Ash-Shams",
        "Al-Layl",
        "Ad-Duha",
        "Ash-Sharh",
        "At-Tin",
        "Al-'Alaq",
        "Al-Qadr",
        "Al-Bayyinah",
        "Az-Zalzalah",
        "Al-'Adiyat",
        "Al-Qari'ah",
        "At-Takathur",
        "Al-'Asr",
        "Al-Humazah",
        "Al-Fil",
        "Quraysh",
        "Al-Ma'un",
        "Al-Kawthar",
        "Al-Kafirun",
        "An-Nasr",
        "Al-Masad",
        "Al-Ikhlas",
        "Al-Falaq",
        "An-Nas",
      ];
      function getSurahName(n) {
        return SURAH_NAMES[n - 1] || `Surah ${n}`;
      }

      const ARABIC_FONTS = {
        almajeed:
          "'AlMajeedQuran','Scheherazade New','Traditional Arabic','Noto Naskh Arabic',serif",
        scheherazade:
          "'Scheherazade New','Traditional Arabic','Noto Naskh Arabic',serif",
        amiri: "'Amiri','Scheherazade New','Traditional Arabic',serif",
        naskh: "'Noto Naskh Arabic','Traditional Arabic',serif",
        hafs: "'Traditional Arabic','Scheherazade New','Noto Naskh Arabic',serif",
        saleem: "'PDMS Saleem','Scheherazade New','Traditional Arabic',serif",
      };

      const RECITERS = [
        { id: 7, name: "Mishary Rashid Al‑Afasy", style: "Hafs · Egypt" },
        { id: 1, name: "AbdulBaset AbdulSamad", style: "Mujawwad · Egypt" },
        { id: 2, name: "AbdulBaset AbdulSamad", style: "Murattal · Egypt" },
        { id: 3, name: "Abdul Rahman Al‑Sudais", style: "Hafs · Saudi Arabia" },
        { id: 4, name: "Sa'ud Al‑Shuraym", style: "Hafs · Saudi Arabia" },
        { id: 9, name: "Mahmoud Khalil Al‑Husary", style: "Hafs · Egypt" },
      ];

      /* ══════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════ */
      const S = {
        surah: null,
        ayah: null,
        verseData: null,
        bookmarks: [],
        showEn: true,
        showBn: true,
        dailyMode: false,
        wavesurfer: null,
        theme: "dark",
        loading: false,
        reciterId: 7,
        settings: {
          fontScale: 100,
          arabicScale: 100,
          lineScale: 100,
          arabicLetterSpacing: 0,
          arabicWordSpacing: 8,
          arabicFont: "almajeed",
        },
      };

      /* ══════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════ */
      document.addEventListener("DOMContentLoaded", () => {
        try {
          S.bookmarks = JSON.parse(localStorage.getItem("qbm") || "[]");
        } catch {}
        try {
          const s = JSON.parse(
            localStorage.getItem("qtarteel_settings") || "{}",
          );
          Object.assign(S.settings, s);
        } catch {}
        S.theme = localStorage.getItem("qtheme") || "dark";
        S.reciterId = parseInt(localStorage.getItem("qreciter") || "7");
        buildReciterMenu();
        applyTheme(S.theme);
        applyAllSettings();
        updateBookmarkBadge();
        renderBookmarkList();
        loadRandomAyah();
        document.addEventListener("click", (e) => {
          // Close reciter dropdown
          const rd = document.getElementById("reciterDropdown");
          if (rd && !rd.contains(e.target)) rd.classList.remove("open");
          // Close surah view dropdown
          const dd = document.getElementById("spDropdown");
          if (dd && !dd.contains(e.target)) dd.classList.remove("open");
        });
      });

      /* ══════════════════════════════════════════════════════════
   THEME
══════════════════════════════════════════════════════════ */
      function applyTheme(t) {
        S.theme = t;
        document.documentElement.setAttribute("data-theme", t);
        // Main page icons
        const dark = document.getElementById("themeIconDark");
        const light = document.getElementById("themeIconLight");
        if (dark) dark.style.display = t === "dark" ? "" : "none";
        if (light) light.style.display = t === "light" ? "" : "none";
        // Surah page icons
        const spDark = document.getElementById("spThemeIconDark");
        const spLight = document.getElementById("spThemeIconLight");
        if (spDark) spDark.style.display = t === "dark" ? "" : "none";
        if (spLight) spLight.style.display = t === "light" ? "" : "none";
        try {
          localStorage.setItem("qtheme", t);
        } catch {}
        if (_waveData) {
          const audio = S.wavesurfer?._audio;
          _drawStaticWave(
            _waveData,
            audio?.duration ? audio.currentTime / audio.duration : 0,
          );
        }
      }
      function toggleTheme() {
        applyTheme(S.theme === "dark" ? "light" : "dark");
      }

      /* ══════════════════════════════════════════════════════════
   SETTINGS
══════════════════════════════════════════════════════════ */
      function applyAllSettings() {
        const {
          fontScale,
          arabicScale,
          lineScale,
          arabicLetterSpacing,
          arabicWordSpacing,
          arabicFont,
        } = S.settings;
        document.documentElement.style.setProperty(
          "--font-scale",
          fontScale / 100,
        );
        document.documentElement.style.setProperty(
          "--arabic-scale",
          arabicScale / 100,
        );
        document.documentElement.style.setProperty(
          "--line-scale",
          lineScale / 100,
        );
        document.documentElement.style.setProperty(
          "--arabic-letter-spacing",
          arabicLetterSpacing + "px",
        );
        document.documentElement.style.setProperty(
          "--arabic-word-spacing",
          arabicWordSpacing + "px",
        );
        const fontStack = ARABIC_FONTS[arabicFont] || ARABIC_FONTS.almajeed;
        document.documentElement.style.setProperty("--arabic-font", fontStack);
        const set = (id, slider, val, fmt) => {
          const el = document.getElementById(id),
            sl = document.getElementById(slider);
          if (el) el.textContent = fmt(val);
          if (sl) sl.value = val;
        };
        set("fontScaleVal", "fontScaleSlider", fontScale, (v) => v + "%");
        set("arabicScaleVal", "arabicScaleSlider", arabicScale, (v) => v + "%");
        set("lineScaleVal", "lineScaleSlider", lineScale, (v) => v + "%");
        set(
          "arabicLetterSpacingVal",
          "arabicLetterSpacingSlider",
          arabicLetterSpacing,
          (v) => v + "px",
        );
        set(
          "arabicWordSpacingVal",
          "arabicWordSpacingSlider",
          arabicWordSpacing,
          (v) => v + "px",
        );
        // Highlight active font option
        document.querySelectorAll(".font-option").forEach((el) => {
          el.classList.toggle("active", el.dataset.font === arabicFont);
        });
      }
      function updateSetting(key, val) {
        val = parseFloat(val);
        S.settings[key] = val;
        try {
          localStorage.setItem("qtarteel_settings", JSON.stringify(S.settings));
        } catch {}
        applyAllSettings();
      }
      function resetSettings() {
        S.settings = {
          fontScale: 100,
          arabicScale: 100,
          lineScale: 100,
          arabicLetterSpacing: 0,
          arabicWordSpacing: 8,
          arabicFont: "almajeed",
        };
        try {
          localStorage.removeItem("qtarteel_settings");
        } catch {}
        applyAllSettings();
        showToast("Settings reset ✦");
      }

      function selectArabicFont(fontKey) {
        S.settings.arabicFont = fontKey;
        try {
          localStorage.setItem("qtarteel_settings", JSON.stringify(S.settings));
        } catch {}
        applyAllSettings();
      }
      function openSettingsDrawer() {
        document.getElementById("settingsDrawer").classList.add("open");
        document.getElementById("drawerOverlay").classList.add("open");
      }
      function closeSettingsDrawer() {
        document.getElementById("settingsDrawer").classList.remove("open");
        const bm = document.getElementById("bookmarkDrawer");
        if (!bm.classList.contains("open"))
          document.getElementById("drawerOverlay").classList.remove("open");
      }

      /* ══════════════════════════════════════════════════════════
   DAILY MODE
══════════════════════════════════════════════════════════ */
      function toggleDailyMode() {
        S.dailyMode = !S.dailyMode;
        document.getElementById("dailyBtn").classList.toggle("on", S.dailyMode);
        loadRandomAyah();
      }
      function getDailyRef() {
        const d = new Date();
        let h =
          d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
        for (let i = 0; i < 8; i++) {
          h = ((h >> 16) ^ h) * 0x45d9f3b;
          h = ((h >> 16) ^ h) & 0xffffffff;
        }
        const n = Math.abs(h) % 6236;
        let c = 0;
        for (const [s, len] of Object.entries(SURAH_LENGTHS)) {
          c += len;
          if (n < c) return { surah: +s, ayah: n - (c - len) + 1 };
        }
        return { surah: 1, ayah: 1 };
      }

      /* ══════════════════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════════════════ */
      let _reqId = 0,
        _retryTimer = null;

      function _setNavBtns(loading) {
        const prev = document.getElementById("prevBtn"),
          next = document.getElementById("nextBtn");
        if (loading) {
          prev.disabled = true;
          next.disabled = true;
        } else {
          prev.disabled = S.surah === 1 && S.ayah === 1;
          next.disabled = S.surah === 114 && S.ayah === SURAH_LENGTHS[114];
        }
      }
      function loadRandomAyah() {
        const ref = S.dailyMode
          ? getDailyRef()
          : { surah: Math.floor(Math.random() * 114) + 1, ayah: 0 };
        if (!ref.ayah)
          ref.ayah = Math.floor(Math.random() * SURAH_LENGTHS[ref.surah]) + 1;
        loadAyah(ref.surah, ref.ayah);
      }
      function navigateAyah(delta) {
        if (!S.surah) return;
        let s = S.surah,
          a = S.ayah + delta;
        if (a < 1) {
          s--;
          if (s < 1) {
            showToast("Already at the first ayah ✦");
            return;
          }
          a = SURAH_LENGTHS[s];
        } else if (a > SURAH_LENGTHS[s]) {
          s++;
          if (s > 114) {
            showToast("Already at the last ayah ✦");
            return;
          }
          a = 1;
        }
        loadAyah(s, a);
      }
      function goToAyah() {
        const s = parseInt(document.getElementById("gotoSurah").value);
        const a = parseInt(document.getElementById("gotoAyah").value);
        if (!s || s < 1 || s > 114) {
          showToast("Surah must be 1–114");
          return;
        }
        const max = SURAH_LENGTHS[s];
        if (!a || a < 1 || a > max) {
          showToast(`Ayah must be 1–${max}`);
          return;
        }
        document.getElementById("gotoSurah").value = "";
        document.getElementById("gotoAyah").value = "";
        loadAyah(s, a);
      }
      /* ══════════════════════════════════════════════════════════
   RECITER CUSTOM DROPDOWN
══════════════════════════════════════════════════════════ */
      function buildReciterMenu() {
        const menu = document.getElementById("reciterMenu");
        if (!menu) return;
        const label = menu.querySelector(".reciter-menu-label");
        // Remove old options
        menu.querySelectorAll(".reciter-option").forEach((e) => e.remove());
        RECITERS.forEach((r) => {
          const div = document.createElement("div");
          div.className =
            "reciter-option" + (r.id === S.reciterId ? " selected" : "");
          div.dataset.id = r.id;
          div.innerHTML = `<div class="reciter-option-dot"></div><div class="reciter-option-text"><div class="reciter-option-name">${r.name}</div><div class="reciter-option-style">${r.style}</div></div>`;
          div.onclick = () => selectReciter(r.id);
          menu.appendChild(div);
        });
        updateReciterBtn();
      }
      function updateReciterBtn() {
        const r = RECITERS.find((r) => r.id === S.reciterId) || RECITERS[0];
        const nameEl = document.getElementById("reciterBtnName");
        const styleEl = document.getElementById("reciterBtnStyle");
        if (nameEl) nameEl.textContent = r.name;
        if (styleEl) styleEl.textContent = r.style;
      }
      function toggleReciterDropdown(e) {
        e.stopPropagation();
        document.getElementById("reciterDropdown").classList.toggle("open");
      }
      function selectReciter(id) {
        S.reciterId = id;
        try {
          localStorage.setItem("qreciter", id);
        } catch {}
        // update option highlights
        document.querySelectorAll(".reciter-option").forEach((el) => {
          el.classList.toggle("selected", parseInt(el.dataset.id) === id);
        });
        document.getElementById("reciterDropdown").classList.remove("open");
        updateReciterBtn();
        if (S.surah && S.ayah) loadAyahAudio(S.surah, S.ayah);
      }
      async function loadAyahAudio(surah, ayah) {
        const key = `${surah}:${ayah}`;
        try {
          const res = await fetch(
            `${BASE}/recitations/${S.reciterId}/by_ayah/${key}`,
          );
          const data = await res.json().catch(() => ({}));
          let url = null;
          if (data?.audio_files?.length) {
            const f = data.audio_files[0];
            url = f.url || f.audio_url || null;
            if (url && !url.startsWith("http"))
              url = "https://verses.quran.com/" + url;
          }
          initWavesurfer(url);
        } catch (e) {
          console.warn(e);
        }
      }

      /* ══════════════════════════════════════════════════════════
   DATA FETCHING
══════════════════════════════════════════════════════════ */
      async function loadAyah(surah, ayah) {
        if (_retryTimer) {
          clearTimeout(_retryTimer);
          _retryTimer = null;
        }
        const id = ++_reqId;
        _setNavBtns(true);
        showLoading(true);
        destroyWavesurfer();
        S.surah = surah;
        S.ayah = ayah;
        const key = `${surah}:${ayah}`;
        try {
          const [vRes, aRes, tfEnRes, tfBnRes] = await Promise.all([
            fetch(
              `${BASE}/verses/by_key/${key}?words=true&word_fields=text_uthmani&fields=text_uthmani&translations=${EN_TR},${BN_TR}`,
            ),
            fetch(`${BASE}/recitations/${S.reciterId}/by_ayah/${key}`),
            fetch(`${BASE}/tafsirs/${EN_TF}/by_ayah/${key}`),
            fetch(`${BASE}/tafsirs/${BN_TF}/by_ayah/${key}`),
          ]);
          if (id !== _reqId) return;
          if (!vRes.ok) throw new Error(`verse HTTP ${vRes.status}`);
          const vData = await vRes.json();
          const aData = await aRes.json().catch(() => ({}));
          const tfEnData = await tfEnRes.json().catch(() => ({}));
          const tfBnData = await tfBnRes.json().catch(() => ({}));
          if (id !== _reqId) return;
          S.verseData = vData;
          render(vData, aData, tfEnData, tfBnData);
        } catch (e) {
          if (id !== _reqId) return;
          console.error("loadAyah:", e);
          showToast("Network error — retrying…");
          _retryTimer = setTimeout(() => {
            _retryTimer = null;
            loadAyah(surah, ayah);
          }, 2200);
        } finally {
          if (id === _reqId) {
            _setNavBtns(false);
            showLoading(false);
          }
        }
      }

      /* ══════════════════════════════════════════════════════════
   RENDER
══════════════════════════════════════════════════════════ */
      function render(vData, aData, tfEnData, tfBnData) {
        const verse = vData.verse;
        if (!verse) {
          showToast("No verse data");
          return;
        }
        const name = getSurahName(S.surah),
          total = SURAH_LENGTHS[S.surah];
        document.getElementById("surahNameEn").textContent = name;
        document.getElementById("surahNum").textContent =
          `Surah ${S.surah} · ${total} Ayahs`;
        document.getElementById("ayahNum").textContent = `Ayah ${S.ayah}`;
        document.getElementById("navLabel").textContent =
          `${name} ${S.surah}:${S.ayah}`;

        const arabicEl = document.getElementById("arabicText");
        const words = (verse.words || []).filter(
          (w) => w.char_type_name !== "end",
        );
        if (words.length) {
          arabicEl.innerHTML = words
            .map(
              (w, i) =>
                `<span class="arabic-word" data-index="${i}">${w.text_uthmani || w.text || ""}</span>`,
            )
            .join(" ");
        } else if (verse.text_uthmani) {
          arabicEl.innerHTML = verse.text_uthmani
            .split(/\s+/)
            .filter(Boolean)
            .map(
              (w, i) =>
                `<span class="arabic-word" data-index="${i}">${w}</span>`,
            )
            .join(" ");
        } else {
          arabicEl.innerHTML =
            "<span style='opacity:.4;font-size:14px'>Arabic text unavailable</span>";
        }

        const trans = verse.translations || [];
        const enT = trans.find((t) => Number(t.resource_id) === EN_TR);
        const bnT = trans.find((t) => Number(t.resource_id) === BN_TR);
        document.getElementById("enText").textContent = enT
          ? cleanText(enT.text)
          : "Translation not available.";
        document.getElementById("bnText").textContent = bnT
          ? cleanText(bnT.text)
          : "অনুবাদ পাওয়া যায়নি।";

        const enF = tfEnData?.tafsir?.text,
          bnF = tfBnData?.tafsir?.text;
        document.getElementById("tafseerEnContent").innerHTML = enF
          ? `<div>${cleanTafseer(enF)}</div>`
          : '<em style="opacity:.45">Tafseer not available.</em>';
        document.getElementById("tafseerBnContent").innerHTML = bnF
          ? `<div>${cleanTafseer(bnF)}</div>`
          : '<em style="opacity:.45">তাফসীর পাওয়া যায়নি।</em>';

        let audioUrl = null;
        if (aData?.audio_files?.length) {
          const f = aData.audio_files[0];
          audioUrl = f.url || f.audio_url || null;
          if (audioUrl && !audioUrl.startsWith("http"))
            audioUrl = "https://verses.quran.com/" + audioUrl;
        }
        initWavesurfer(audioUrl);
        updateBookmarkButton();

        const card = document.getElementById("ayahCard");
        card.style.animation = "none";
        void card.offsetHeight;
        card.style.animation = "fadeInCard .55s ease";
      }

      /* ══════════════════════════════════════════════════════════
   TEXT UTILITIES
══════════════════════════════════════════════════════════ */
      function cleanText(t) {
        if (!t) return "";
        return t
          .replace(/<[^>]+>/g, "")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&nbsp;/g, " ")
          .replace(/\s+/g, " ")
          .trim();
      }
      function cleanTafseer(t) {
        if (!t) return "";
        return t
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/<p[^>]*>/gi, "\n")
          .replace(/<\/p>/gi, "")
          .replace(/<h[1-6][^>]*>/gi, "\n<strong>")
          .replace(/<\/h[1-6]>/gi, "</strong>\n")
          .replace(/<[^>]+>/g, "")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&nbsp;/g, " ")
          .trim()
          .replace(/\n{3,}/g, "\n\n")
          .replace(/\n/g, "<br>");
      }

      /* ══════════════════════════════════════════════════════════
   CANVAS WAVEFORM PLAYER
══════════════════════════════════════════════════════════ */
      let _waveRAF = null,
        _audioCtx = null,
        _waveData = null,
        _peaksLoading = false;

      function _getThemeColor() {
        return (
          getComputedStyle(document.documentElement)
            .getPropertyValue("--gold-1")
            .trim() || "#c9a84c"
        );
      }
      function _resizeCanvas() {
        const c = document.getElementById("waveCanvas");
        if (!c) return;
        const w = document.getElementById("waveformWrap");
        c.width = w.offsetWidth * devicePixelRatio;
        c.height = 64 * devicePixelRatio;
        c.style.width = w.offsetWidth + "px";
        c.style.height = "64px";
      }
      function _drawStaticWave(peaks, progress) {
        const c = document.getElementById("waveCanvas");
        if (!c) return;
        const ctx = c.getContext("2d"),
          W = c.width,
          H = c.height,
          mid = H / 2;
        const col = _getThemeColor(),
          barW = W / peaks.length,
          gap = Math.max(devicePixelRatio, barW * 0.25);
        ctx.clearRect(0, 0, W, H);
        const splitX = Math.floor(progress * W);
        peaks.forEach((p, i) => {
          const x = i * barW,
            h = Math.max(2 * devicePixelRatio, p * H * 0.85);
          if (x < splitX) {
            const g = ctx.createLinearGradient(x, mid - h / 2, x, mid + h / 2);
            g.addColorStop(0, col + "aa");
            g.addColorStop(0.5, col);
            g.addColorStop(1, col + "aa");
            ctx.fillStyle = g;
          } else
            ctx.fillStyle =
              getComputedStyle(document.documentElement)
                .getPropertyValue("--border")
                .trim() || "rgba(255,255,255,.13)";
          ctx.beginPath();
          ctx.roundRect(
            x + gap / 2,
            mid - h / 2,
            Math.max(1, barW - gap),
            h,
            2,
          );
          ctx.fill();
        });
        if (progress > 0.002 && progress < 0.998) {
          ctx.strokeStyle = col;
          ctx.lineWidth = 1.5 * devicePixelRatio;
          ctx.globalAlpha = 0.9;
          ctx.beginPath();
          ctx.moveTo(splitX, 0);
          ctx.lineTo(splitX, H);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
      function _buildPeaks(buffer, numBars) {
        const raw = buffer.getChannelData(0),
          step = Math.floor(raw.length / numBars),
          peaks = [];
        for (let i = 0; i < numBars; i++) {
          let max = 0;
          for (let j = 0; j < step; j++) {
            const v = Math.abs(raw[i * step + j] || 0);
            if (v > max) max = v;
          }
          peaks.push(max);
        }
        const maxP = Math.max(...peaks, 0.001);
        return peaks.map((p) => p / maxP);
      }
      async function _initPeaks(url) {
        if (_peaksLoading) return;
        _peaksLoading = true;
        try {
          const resp = await fetch(url),
            buf = await resp.arrayBuffer();
          const offCtx = new OfflineAudioContext(1, 1, 44100);
          const decoded = await offCtx.decodeAudioData(buf);
          const wrap = document.getElementById("waveformWrap");
          if (!wrap) {
            _peaksLoading = false;
            return;
          }
          const numBars = Math.floor((wrap.offsetWidth * devicePixelRatio) / 4);
          _waveData = _buildPeaks(decoded, numBars);
          _resizeCanvas();
          const ph = document.getElementById("waveformPlaceholder"),
            canvas = document.getElementById("waveCanvas");
          if (ph) ph.style.display = "none";
          if (canvas) canvas.style.display = "block";
          const audio = S.wavesurfer?._audio;
          _drawStaticWave(
            _waveData,
            audio?.duration ? audio.currentTime / audio.duration : 0,
          );
        } catch (e) {
          console.warn("Peak decode failed", e);
        }
        _peaksLoading = false;
      }
      function _makeFakePeaks(n) {
        // Generate a plausible-looking waveform without needing audio decode
        const peaks = [];
        for (let i = 0; i < n; i++) {
          const t = i / n;
          // Bell-curve envelope with noise
          const env = Math.sin(t * Math.PI) * 0.7 + 0.3;
          const noise =
            0.5 +
            0.5 * Math.sin(i * 7.3) * Math.cos(i * 3.7) * Math.sin(i * 1.9);
          peaks.push(Math.max(0.05, Math.min(1, env * noise)));
        }
        return peaks;
      }
      function initWavesurfer(url) {
        destroyWavesurfer();
        _resizeCanvas();
        const ph = document.getElementById("waveformPlaceholder"),
          canvas = document.getElementById("waveCanvas");
        document.getElementById("playerTime").textContent = "0:00 / 0:00";
        const pb = document.getElementById("playBtn");
        pb.textContent = "▶";
        pb.classList.remove("playing");
        if (!url) {
          ph.style.display = "flex";
          canvas.style.display = "none";
          ph.innerHTML =
            '<span style="font-size:12px;color:var(--text2);font-family:Cinzel,serif;letter-spacing:.1em">No audio available</span>';
          return;
        }
        // Show canvas immediately with fake peaks
        ph.style.display = "none";
        canvas.style.display = "block";
        const wrap = document.getElementById("waveformWrap");
        const numBars = Math.max(60, Math.floor((wrap.offsetWidth || 300) / 4));
        _waveData = _makeFakePeaks(numBars);
        _drawStaticWave(_waveData, 0);
        try {
          const audio = new Audio();
          audio.preload = "auto";
          audio.src = url;
          const fmt = (t) =>
            `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
          const ws = {
            _audio: audio,
            _url: url,
            getDuration() {
              return isFinite(audio.duration) ? audio.duration : 0;
            },
            getCurrentTime() {
              return audio.currentTime;
            },
            async playPause() {
              if (!_audioCtx)
                _audioCtx = new (
                  window.AudioContext || window.webkitAudioContext
                )();
              if (_audioCtx.state === "suspended") await _audioCtx.resume();
              audio.paused ? audio.play() : audio.pause();
            },
            seekTo(pct) {
              if (isFinite(audio.duration))
                audio.currentTime = pct * audio.duration;
            },
            destroy() {
              audio.pause();
              audio.src = "";
            },
            setOptions() {},
          };
          // Try to get real peaks in background; replace fake peaks if it works
          _initPeaks(url);
          audio.addEventListener(
            "loadedmetadata",
            () =>
              (document.getElementById("playerTime").textContent =
                `0:00 / ${fmt(ws.getDuration())}`),
          );
          audio.addEventListener("timeupdate", () => {
            document.getElementById("playerTime").textContent =
              `${fmt(audio.currentTime)} / ${fmt(ws.getDuration())}`;
            if (_waveData && audio.duration > 0)
              _drawStaticWave(_waveData, audio.currentTime / audio.duration);
          });
          audio.addEventListener("play", () => {
            pb.textContent = "⏸";
            pb.classList.add("playing");
            S.isPlaying = true;
            startHighlight(ws);
          });
          audio.addEventListener("pause", () => {
            pb.textContent = "▶";
            pb.classList.remove("playing");
            S.isPlaying = false;
          });
          audio.addEventListener("ended", () => {
            pb.textContent = "▶";
            pb.classList.remove("playing");
            S.isPlaying = false;
            clearHighlight();
            if (_waveData) _drawStaticWave(_waveData, 1);
          });
          audio.addEventListener("error", () => {
            ph.style.display = "flex";
            canvas.style.display = "none";
            ph.innerHTML =
              '<span style="font-size:12px;color:var(--text2);font-family:Cinzel,serif;letter-spacing:.1em">Audio unavailable</span>';
          });
          S.wavesurfer = ws;
        } catch (e) {
          console.warn(e);
        }
      }
      function destroyWavesurfer() {
        if (_waveRAF) {
          cancelAnimationFrame(_waveRAF);
          _waveRAF = null;
        }
        if (S.wavesurfer) {
          try {
            S.wavesurfer.destroy();
          } catch {}
          S.wavesurfer = null;
        }
        _waveData = null;
        _peaksLoading = false;
        S.isPlaying = false;
        clearHighlight();
        const c = document.getElementById("waveCanvas");
        if (c) c.getContext("2d").clearRect(0, 0, c.width, c.height);
      }
      function seekByClick(e) {
        if (!S.wavesurfer) return;
        const w = document.getElementById("waveformWrap");
        S.wavesurfer.seekTo(
          Math.max(0, Math.min(1, e.offsetX / w.offsetWidth)),
        );
      }
      window.addEventListener("resize", () => {
        _resizeCanvas();
        const a = S.wavesurfer?._audio;
        if (_waveData)
          _drawStaticWave(
            _waveData,
            a?.duration ? a.currentTime / a.duration : 0,
          );
      });
      function togglePlay() {
        if (S.wavesurfer) S.wavesurfer.playPause();
      }
      function replayAudio() {
        if (S.wavesurfer) {
          S.wavesurfer.seekTo(0);
          S.wavesurfer._audio.play();
        }
      }

      /* ══════════════════════════════════════════════════════════
   WORD HIGHLIGHT
══════════════════════════════════════════════════════════ */
      let hlTimer = null;
      function startHighlight(ws) {
        clearHighlight();
        const words = document.querySelectorAll(".arabic-word");
        if (!words.length) return;
        hlTimer = setInterval(() => {
          const dur = ws.getDuration(),
            cur = ws.getCurrentTime();
          if (!dur || !isFinite(dur)) return;
          const idx = Math.min(
            Math.floor((cur / dur) * words.length),
            words.length - 1,
          );
          words.forEach((w, i) => w.classList.toggle("highlight", i === idx));
        }, 60);
      }
      function clearHighlight() {
        if (hlTimer) {
          clearInterval(hlTimer);
          hlTimer = null;
        }
        document
          .querySelectorAll(".arabic-word.highlight")
          .forEach((el) => el.classList.remove("highlight"));
      }

      /* ══════════════════════════════════════════════════════════
   TOGGLES
══════════════════════════════════════════════════════════ */
      function toggleTranslation(lang) {
        if (lang === "en") {
          S.showEn = !S.showEn;
          document
            .getElementById("enBlock")
            .classList.toggle("hidden", !S.showEn);
          document
            .getElementById("toggleEn")
            .classList.toggle("active", S.showEn);
        } else {
          S.showBn = !S.showBn;
          document
            .getElementById("bnBlock")
            .classList.toggle("hidden", !S.showBn);
          document
            .getElementById("toggleBn")
            .classList.toggle("active", S.showBn);
        }
      }
      function toggleTafseer(lang) {
        document
          .getElementById(`tafseer${lang === "en" ? "En" : "Bn"}Accordion`)
          .classList.toggle("open");
      }

      /* ══════════════════════════════════════════════════════════
   LOADING
══════════════════════════════════════════════════════════ */
      function showLoading(v) {
        document
          .getElementById("loadingOverlay")
          .classList.toggle("hidden", !v);
      }

      /* ══════════════════════════════════════════════════════════
   BOOKMARKS
══════════════════════════════════════════════════════════ */
      let _noteEditKey = null;

      function toggleBookmark() {
        if (!S.verseData) return;
        const key = `${S.surah}:${S.ayah}`;
        const idx = S.bookmarks.findIndex((b) => b.key === key);
        if (idx === -1) {
          const v = S.verseData.verse;
          const enT = (v.translations || []).find(
            (t) => Number(t.resource_id) === EN_TR,
          );
          S.bookmarks.push({
            key,
            surah: S.surah,
            ayah: S.ayah,
            arabic: v.text_uthmani || "",
            translation: enT ? cleanText(enT.text) : "",
            surahName: getSurahName(S.surah),
            note: "",
          });
          showToast("Bookmarked ✦");
          saveBookmarks();
          updateBookmarkButton();
          updateBookmarkBadge();
          renderBookmarkList();
          // Open note modal
          openNoteModal(key);
        } else {
          S.bookmarks.splice(idx, 1);
          showToast("Bookmark removed");
          saveBookmarks();
          updateBookmarkButton();
          updateBookmarkBadge();
          renderBookmarkList();
        }
      }
      function saveBookmarks() {
        try {
          localStorage.setItem("qbm", JSON.stringify(S.bookmarks));
        } catch {}
      }
      function openNoteModal(key) {
        const bm = S.bookmarks.find((b) => b.key === key);
        if (!bm) return;
        _noteEditKey = key;
        document.getElementById("noteModalRef").textContent =
          `${bm.surahName} · ${key}`;
        document.getElementById("noteModalText").value = bm.note || "";
        document.getElementById("noteModal").classList.add("open");
      }
      function closeNoteModal() {
        document.getElementById("noteModal").classList.remove("open");
        _noteEditKey = null;
      }
      function saveNote() {
        if (!_noteEditKey) return;
        const bm = S.bookmarks.find((b) => b.key === _noteEditKey);
        if (bm) bm.note = document.getElementById("noteModalText").value.trim();
        saveBookmarks();
        renderBookmarkList();
        closeNoteModal();
        showToast("Note saved ✦");
      }

      function updateBookmarkButton() {
        const saved = S.bookmarks.some((b) => b.key === `${S.surah}:${S.ayah}`);
        const btn = document.getElementById("bookmarkBtn");
        btn.classList.toggle("bookmarked", saved);
        const fill = saved ? "var(--gold-1)" : "none";
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="${fill}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>${saved ? "Saved" : "Save"}`;
      }
      function updateBookmarkBadge() {
        const n = S.bookmarks.length,
          el = document.getElementById("bookmarkCount");
        if (el) {
          el.textContent = n;
          el.style.display = n > 0 ? "flex" : "none";
        }
      }
      function renderBookmarkList() {
        const c = document.getElementById("bookmarkList");
        if (!S.bookmarks.length) {
          c.innerHTML =
            '<div class="bookmark-empty">No bookmarks yet.<br>Bookmark an ayah to save it here.</div>';
          return;
        }
        c.innerHTML = [...S.bookmarks]
          .reverse()
          .map(
            (b) => `
    <div class="bookmark-item">
      <div class="bookmark-item-header" onclick="loadBookmarkItem('${b.key}')">
        <div>
          <div class="bookmark-ref">${b.surahName} · ${b.key}</div>
          <div class="bookmark-arabic" dir="rtl">${b.arabic.split(" ").slice(0, 6).join(" ")}…</div>
          <div class="bookmark-trans">${(b.translation || "").substring(0, 90)}…</div>
        </div>
      </div>
      ${b.note ? `<div class="bookmark-note">${b.note}</div>` : ""}
      <div class="bookmark-actions">
        <button class="bm-action-btn" onclick="loadBookmarkItem('${b.key}')">Go to Ayah</button>
        <button class="bm-action-btn" onclick="openNoteModal('${b.key}')">${b.note ? "Edit Note" : "Add Note"}</button>
        <button class="bm-action-btn" onclick="deleteBookmark('${b.key}')">Remove</button>
      </div>
    </div>`,
          )
          .join("");
      }
      function deleteBookmark(key) {
        S.bookmarks = S.bookmarks.filter((b) => b.key !== key);
        saveBookmarks();
        updateBookmarkBadge();
        renderBookmarkList();
        if (`${S.surah}:${S.ayah}` === key) updateBookmarkButton();
        showToast("Bookmark removed");
      }
      function loadBookmarkItem(key) {
        const [s, a] = key.split(":").map(Number);
        closeBookmarkDrawer();
        loadAyah(s, a);
      }
      function openBookmarkDrawer() {
        document.getElementById("bookmarkDrawer").classList.add("open");
        document.getElementById("drawerOverlay").classList.add("open");
      }
      function closeBookmarkDrawer() {
        document.getElementById("bookmarkDrawer").classList.remove("open");
        const sd = document.getElementById("settingsDrawer");
        if (!sd.classList.contains("open"))
          document.getElementById("drawerOverlay").classList.remove("open");
      }
      function closeAllDrawers() {
        closeBookmarkDrawer();
        closeSettingsDrawer();
      }

      /* ══════════════════════════════════════════════════════════
   FULL SURAH PAGE
══════════════════════════════════════════════════════════ */
      const SP = {
        surah: null,
        verses: [],
        audioUrls: {},
        tafsirEn: {},
        tafsirBn: {},
        currentKey: null,
        audio: null,
        autoPlay: true,
        loop: false,
        showEn: true,
        showBn: false,
        showTfEn: false,
        showTfBn: false,
        tajweed: true,
        hlTimer: null,
        loading: false,
        totalAyahs: 0,
        wbwEnabled: true,
        wbwLang: "en",
        wbwBnWords: {},
        wbwBnLoaded: false,
        wbwBnLoading: false,
      };

      function openSurahPage() {
        if (!S.surah) return;
        document.getElementById("surahPage").classList.add("open");
        document.body.style.overflow = "hidden";
        loadSurahData(S.surah, S.ayah);
        // Draw idle waveform after layout settles
        setTimeout(() => {
          _spWavePeaks = _spMakePeaks();
          _spDrawWave(0);
        }, 300);
        // Redraw on resize
        if (!_spResizeObs) {
          _spResizeObs = new ResizeObserver(() => {
            _spDrawWave(
              SP.audio && SP.audio.duration > 0
                ? SP.audio.currentTime / SP.audio.duration
                : 0,
            );
          });
          const wrap = document.getElementById("spWaveWrap");
          if (wrap) _spResizeObs.observe(wrap);
        }
      }
      let _spResizeObs = null;
      function closeSurahPage() {
        document.getElementById("surahPage").classList.remove("open");
        document.body.style.overflow = "";
        spStopAudio();
      }

      async function loadSurahData(surah, startAyah) {
        SP.surah = surah;
        SP.verses = [];
        SP.audioUrls = {};
        SP.tafsirEn = {};
        SP.tafsirBn = {};
        SP.currentKey = null;
        SP.wbwBnWords = {};
        SP.wbwBnLoaded = false;
        SP.wbwBnLoading = false;
        SP.totalAyahs = SURAH_LENGTHS[surah];
        const name = getSurahName(surah);
        document.getElementById("spTitleName").textContent = name;
        document.getElementById("spTitleSub").textContent =
          `Surah ${surah} · ${SP.totalAyahs} Ayahs`;
        document.getElementById("spContent").innerHTML =
          `<div style="text-align:center;padding:80px 24px;color:var(--text3)"><div class="loading-arabic" style="font-size:32px">بِسْمِ اللَّهِ</div><div style="margin-top:16px;font-family:'Cinzel',serif;font-size:11px;letter-spacing:.2em">Loading ${name}…</div></div>`;

        try {
          const [vRes, aRes] = await Promise.all([
            fetch(
              `${BASE}/verses/by_chapter/${surah}?words=true&word_fields=text_uthmani,translation,transliteration&fields=text_uthmani&translations=${EN_TR},${BN_TR}&per_page=300`,
            ),
            fetch(`${BASE}/recitations/${S.reciterId}/by_chapter/${surah}`),
          ]);
          const vData = await vRes.json();
          const aData = await aRes.json().catch(() => ({}));

          SP.verses = vData.verses || [];

          // Map audio — reject empty/whitespace URLs to avoid MEDIA_ELEMENT_ERROR: Empty src
          (aData.audio_files || []).forEach((f) => {
            let url = f.url || f.audio_url || null;
            if (url) url = url.trim();
            if (!url) return; // skip empty strings entirely
            if (!url.startsWith("http"))
              url = "https://verses.quran.com/" + url;
            SP.audioUrls[f.verse_key || f.key] = url;
          });

          renderSurahPage();

          // Scroll to starting ayah
          if (startAyah) {
            requestAnimationFrame(() => {
              const el = document.querySelector(
                `.sp-ayah[data-key="${surah}:${startAyah}"]`,
              );
              if (el)
                el.scrollIntoView({ behavior: "smooth", block: "center" });
            });
          }
        } catch (e) {
          console.error("loadSurahData:", e);
          document.getElementById("spContent").innerHTML =
            `<div style="text-align:center;padding:80px 24px;color:var(--text3);font-family:'Cinzel',serif">Failed to load surah. Please check your connection.</div>`;
        }
      }

      function renderSurahPage() {
        const surah = SP.surah,
          name = getSurahName(surah);

        let html = `<div id="tjLegend"></div>`;
        html += `<div class="sp-surah-header">`;
        if (surah !== 9)
          html += `<div class="sp-bismillah">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</div>`;
        html += `<div class="sp-surah-name">${name}</div><div class="sp-surah-meta">Surah ${surah} · ${SP.totalAyahs} Ayahs</div></div>`;

        SP.verses.forEach((verse, idx) => {
          const key =
            verse.verse_key || `${surah}:${verse.verse_number || idx + 1}`;
          const ayahNum = verse.verse_number || idx + 1;
          const words = (verse.words || []).filter(
            (w) => w.char_type_name !== "end",
          );

          // ── Arabic HTML with optional Tajweed coloring ───────
          let arabicHtml = "";
          if (words.length) {
            arabicHtml = words
              .map((w, wi) => {
                const wt = w.text_uthmani || w.text || "";
                const rendered = SP.tajweed ? TajweedEngine.renderWord(wt) : wt;
                const enTr = (
                  w.translation?.text ||
                  w.transliteration?.text ||
                  ""
                ).replace(/"/g, "&quot;");
                return `<span class="sp-word" data-key="${key}" data-wi="${wi}" data-ar="${wt.replace(/"/g, "&quot;")}" data-en="${enTr}">${rendered}</span>`;
              })
              .join(" ");
          } else if (verse.text_uthmani) {
            const wordTexts = verse.text_uthmani.split(/\s+/).filter(Boolean);
            arabicHtml = wordTexts
              .map((wt, wi) => {
                const rendered = SP.tajweed ? TajweedEngine.renderWord(wt) : wt;
                return `<span class="sp-word" data-key="${key}" data-wi="${wi}" data-ar="${wt.replace(/"/g, "&quot;")}" data-en="">${rendered}</span>`;
              })
              .join(" ");
          }

          const trans = verse.translations || [];
          const enT = trans.find((t) => Number(t.resource_id) === EN_TR);
          const bnT = trans.find((t) => Number(t.resource_id) === BN_TR);
          const enText = enT
            ? cleanText(enT.text)
            : "Translation not available.";
          const bnText = bnT ? cleanText(bnT.text) : "অনুবাদ পাওয়া যায়নি।";

          html += `<div class="sp-ayah" data-key="${key}" data-idx="${idx}">
      <div class="sp-ayah-top">
        <div class="sp-ayah-num">${ayahNum}</div>
        <button class="sp-play-btn" data-key="${key}" onclick="spInlineToggle('${key}',${idx})" title="Play this ayah">▶</button>
      </div>
      <div class="sp-arabic" dir="rtl">${arabicHtml}</div>
      <div class="sp-trans-block${SP.showEn ? "" : " hidden"}" data-lang="en">
        <div class="sp-trans"><div class="sp-trans-lang">English · Saheeh International</div><div class="sp-trans-text">${enText}</div></div>
      </div>
      <div class="sp-trans-block${SP.showBn ? "" : " hidden"}" data-lang="bn">
        <div class="sp-trans"><div class="sp-trans-lang">বাংলা · তাইসিরুল কুরআন</div><div class="sp-trans-text bn">${bnText}</div></div>
      </div>`;

          if (SP.showTfEn) {
            html += `<div class="sp-tafseer-acc sp-tf-en-${key}" data-key="${key}" data-type="en">
        <div class="sp-tafseer-head" onclick="toggleSpTafseer(this)">English Tafseer — Ibn Kathir <span class="sp-tafseer-chev">▾</span></div>
        <div class="sp-tafseer-body"><div class="sp-tafseer-text" data-key="${key}" data-type="en">Tap to expand</div></div>
      </div>`;
          }
          if (SP.showTfBn) {
            html += `<div class="sp-tafseer-acc sp-tf-bn-${key}" data-key="${key}" data-type="bn">
        <div class="sp-tafseer-head" onclick="toggleSpTafseer(this)">বাংলা তাফসীর — আহসানুল বায়ান <span class="sp-tafseer-chev">▾</span></div>
        <div class="sp-tafseer-body"><div class="sp-tafseer-text bn" data-key="${key}" data-type="bn">Tap to expand</div></div>
      </div>`;
          }
          html += `</div>`;
          // Add ornamental divider between ayahs (not after the last one)
          if (idx < SP.verses.length - 1) {
            html += `<div class="sp-ayah-divider">
        <div class="sp-ayah-divider-line"></div>
        <div class="sp-ayah-divider-diamond"></div>
        <div class="sp-ayah-divider-num">${ayahNum}</div>
        <div class="sp-ayah-divider-diamond"></div>
        <div class="sp-ayah-divider-line"></div>
      </div>`;
          }
        });

        document.getElementById("spContent").innerHTML = html;
        document.getElementById("spPlayerAyah").textContent =
          `— / ${SP.totalAyahs}`;
        // Build the live legend and wire up the tooltip
        TajweedEngine.buildLegend();
        TajweedEngine.initTooltip();
        // Show legend if tajweed is on
        const leg = document.getElementById("tjLegend");
        if (leg) leg.classList.toggle("show", SP.tajweed);
      }

      function toggleSpDropdown() {
        document.getElementById("spDropdown").classList.toggle("open");
      }

      function toggleSpOption(opt) {
        const map = {
          en: "spOptEn",
          bn: "spOptBn",
          tfEn: "spOptTfEn",
          tfBn: "spOptTfBn",
          tajweed: "spOptTajweed",
        };
        const el = document.getElementById(map[opt]);
        if (!el) return;
        const nowOn = !el.classList.contains("active");
        el.classList.toggle("active", nowOn);

        if (opt === "tajweed") {
          SP.tajweed = nowOn;
          // Update header button state
          const tjBtn = document.getElementById("spTajweedBtn");
          if (tjBtn) tjBtn.classList.toggle("off", !nowOn);
          // Show/hide legend
          const leg = document.getElementById("tjLegend");
          if (leg) leg.classList.toggle("show", nowOn);
          // Re-render Arabic text in all ayahs
          SP.verses.forEach((verse, idx) => {
            const key =
              verse.verse_key || `${SP.surah}:${verse.verse_number || idx + 1}`;
            const ayahEl = document.querySelector(
              `.sp-ayah[data-key="${key}"]`,
            );
            if (!ayahEl) return;
            const arabicEl = ayahEl.querySelector(".sp-arabic");
            if (!arabicEl) return;
            const words = (verse.words || []).filter(
              (w) => w.char_type_name !== "end",
            );
            const newHtml = words.length
              ? words
                  .map((w, wi) => {
                    const wt = w.text_uthmani || w.text || "";
                    const rendered = nowOn ? TajweedEngine.renderWord(wt) : wt;
                    const enTr = (
                      w.translation?.text ||
                      w.transliteration?.text ||
                      ""
                    ).replace(/"/g, "&quot;");
                    const bnTr = (SP.wbwBnWords[`${key}:${wi}`] || "").replace(
                      /"/g,
                      "&quot;",
                    );
                    return `<span class="sp-word" data-key="${key}" data-wi="${wi}" data-ar="${wt.replace(/"/g, "&quot;")}" data-en="${enTr}" data-bn="${bnTr}">${rendered}</span>`;
                  })
                  .join(" ")
              : (verse.text_uthmani || "")
                  .split(/\s+/)
                  .filter(Boolean)
                  .map((wt, wi) => {
                    const rendered = nowOn ? TajweedEngine.renderWord(wt) : wt;
                    return `<span class="sp-word" data-key="${key}" data-wi="${wi}" data-ar="${wt.replace(/"/g, "&quot;")}" data-en="" data-bn="">${rendered}</span>`;
                  })
                  .join(" ");
            arabicEl.innerHTML = newHtml;
          });
          showToast(nowOn ? "Tajweed Colors: On ✦" : "Tajweed Colors: Off");
          return;
        } else if (opt === "en") {
          SP.showEn = nowOn;
          document
            .querySelectorAll(".sp-trans-block[data-lang='en']")
            .forEach((e) => e.classList.toggle("hidden", !nowOn));
        } else if (opt === "bn") {
          SP.showBn = nowOn;
          document
            .querySelectorAll(".sp-trans-block[data-lang='bn']")
            .forEach((e) => e.classList.toggle("hidden", !nowOn));
        } else if (opt === "tfEn") {
          SP.showTfEn = nowOn;
          if (nowOn) {
            // Inject Ibn Kathir tafsir accordions; lazy fetch content on open
            SP.verses.forEach((verse, idx) => {
              const key =
                verse.verse_key ||
                `${SP.surah}:${verse.verse_number || idx + 1}`;
              const ayahEl = document.querySelector(
                `.sp-ayah[data-key="${key}"]`,
              );
              if (
                !ayahEl ||
                ayahEl.querySelector(`.sp-tafseer-acc[data-type="en"]`)
              )
                return;
              const acc = document.createElement("div");
              acc.className = "sp-tafseer-acc";
              acc.dataset.key = key;
              acc.dataset.type = "en";
              acc.innerHTML = `<div class="sp-tafseer-head" onclick="toggleSpTafseer(this)">English Tafsir — Ibn Kathir <span class="sp-tafseer-chev">▾</span></div><div class="sp-tafseer-body"><div class="sp-tafseer-text" data-key="${key}" data-type="en">Tap to expand</div></div>`;
              ayahEl.appendChild(acc);
            });
          } else {
            document
              .querySelectorAll(`.sp-tafseer-acc[data-type="en"]`)
              .forEach((e) => e.remove());
          }
        } else if (opt === "tfBn") {
          SP.showTfBn = nowOn;
          if (nowOn) {
            SP.verses.forEach((verse, idx) => {
              const key =
                verse.verse_key ||
                `${SP.surah}:${verse.verse_number || idx + 1}`;
              const ayahEl = document.querySelector(
                `.sp-ayah[data-key="${key}"]`,
              );
              if (
                !ayahEl ||
                ayahEl.querySelector(`.sp-tafseer-acc[data-type="bn"]`)
              )
                return;
              const acc = document.createElement("div");
              acc.className = "sp-tafseer-acc";
              acc.dataset.key = key;
              acc.dataset.type = "bn";
              acc.innerHTML = `<div class="sp-tafseer-head" onclick="toggleSpTafseer(this)">বাংলা তাফসীর — আহসানুল বায়ান <span class="sp-tafseer-chev">▾</span></div><div class="sp-tafseer-body"><div class="sp-tafseer-text bn" data-key="${key}" data-type="bn">Loading…</div></div>`;
              ayahEl.appendChild(acc);
            });
            loadSpTafseer("bn");
          } else {
            document
              .querySelectorAll(`.sp-tafseer-acc[data-type="bn"]`)
              .forEach((e) => e.remove());
          }
        } else if (opt === "wbw") {
          SP.wbwEnabled = nowOn;
          showToast(nowOn ? "Word Meanings: On ✦" : "Word Meanings: Off");
        }
      }

      /* ══════════════════════════════════════════════════════════
   WORD-BY-WORD POPUP
══════════════════════════════════════════════════════════ */
      let _wbwHideTimer = null;

      function setWbwLang(lang) {
        SP.wbwLang = lang;
        document
          .getElementById("wbwLangEn")
          .classList.toggle("active", lang === "en");
        document
          .getElementById("wbwLangBn")
          .classList.toggle("active", lang === "bn");
        if (lang === "bn" && !SP.wbwBnLoaded && !SP.wbwBnLoading)
          _loadWbwBnWords();
        // close any open popup
        _hideWbwPopup(true);
      }

      async function _loadWbwBnWords() {
        if (!SP.surah || SP.wbwBnLoading) return;
        SP.wbwBnLoading = true;
        try {
          const res = await fetch(
            `${BASE}/verses/by_chapter/${SP.surah}?words=true&word_fields=text_uthmani,translation&per_page=300&language=bn`,
          );
          const data = await res.json();
          (data.verses || []).forEach((verse) => {
            const vkey = verse.verse_key || `${SP.surah}:${verse.verse_number}`;
            const filteredWords = (verse.words || []).filter(
              (w) => w.char_type_name !== "end",
            );
            filteredWords.forEach((w, wi) => {
              const bn = w.translation?.text || "";
              SP.wbwBnWords[`${vkey}:${wi}`] = bn;
              // Also stamp data-bn onto existing spans
              const span = document.querySelector(
                `.sp-word[data-key="${vkey}"][data-wi="${wi}"]`,
              );
              if (span && bn) span.dataset.bn = bn;
            });
          });
          SP.wbwBnLoaded = true;
        } catch (e) {
          console.warn("WBW BN load failed", e);
        }
        SP.wbwBnLoading = false;
      }

      function showWbwPopup(el) {
        if (!SP.wbwEnabled) return;
        clearTimeout(_wbwHideTimer);

        const arabic = el.dataset.ar || "";
        const en = el.dataset.en || "";
        const bn = el.dataset.bn || "";
        const trans = SP.wbwLang === "bn" ? bn : en;

        // Nothing to show yet
        if (!arabic && !trans && !en) return;

        const popup = document.getElementById("wbwPopup");
        popup.querySelector(".wbw-lang-tag").textContent =
          SP.wbwLang === "bn" ? "বাংলা" : "English";
        popup.querySelector(".wbw-arabic").textContent = arabic;
        const transEl = popup.querySelector(".wbw-trans");
        transEl.textContent =
          trans ||
          (SP.wbwLang === "bn" && SP.wbwBnLoading ? "লোড হচ্ছে…" : en || "—");
        transEl.className = "wbw-trans" + (SP.wbwLang === "bn" ? " bn" : "");

        // Position above the word (popup is position:fixed, coords are viewport-relative)
        popup.classList.remove("show");
        const rect = el.getBoundingClientRect();
        const pw = popup.offsetWidth || 140;
        const ph = popup.offsetHeight || 70;
        let left = rect.left + rect.width / 2 - pw / 2;
        let top = rect.top - ph - 12;
        // Clamp horizontally within viewport
        left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
        // Flip below word if not enough room above
        if (top < 8) top = rect.bottom + 12;
        popup.style.left = left + "px";
        popup.style.top = top + "px";
        popup.classList.add("show");

        // If BN selected and not yet loaded, fetch then refresh
        if (SP.wbwLang === "bn" && !SP.wbwBnLoaded && !SP.wbwBnLoading) {
          _loadWbwBnWords().then(() => {
            const fresh = el.dataset.bn || "";
            if (fresh) transEl.textContent = fresh;
          });
        }
      }

      function hideWbwPopup(immediate) {
        if (immediate) {
          _hideWbwPopup(true);
          return;
        }
        _wbwHideTimer = setTimeout(() => _hideWbwPopup(false), 220);
      }

      function _hideWbwPopup(immediate) {
        clearTimeout(_wbwHideTimer);
        const popup = document.getElementById("wbwPopup");
        popup.classList.remove("show");
      }

      // Wire up events via delegation on spContent
      (function initWbwEvents() {
        // Desktop — mouseover / mouseout
        document.addEventListener(
          "mouseover",
          (e) => {
            const w = e.target.closest(".sp-word");
            if (w) showWbwPopup(w);
          },
          { passive: true },
        );

        document.addEventListener(
          "mouseout",
          (e) => {
            const w = e.target.closest(".sp-word");
            if (w) hideWbwPopup(false);
          },
          { passive: true },
        );

        // Mobile — touchstart shows, touchend / touchmove hides
        document.addEventListener(
          "touchstart",
          (e) => {
            const w = e.target.closest(".sp-word");
            if (!w) {
              hideWbwPopup(true);
              return;
            }
            e.preventDefault();
            showWbwPopup(w);
          },
          { passive: false },
        );

        document.addEventListener("touchmove", () => hideWbwPopup(true), {
          passive: true,
        });
        document.addEventListener(
          "touchend",
          (e) => {
            if (!e.target.closest(".sp-word")) hideWbwPopup(true);
          },
          { passive: true },
        );
      })();

      async function loadSpTafseer(lang) {
        const tfId = lang === "en" ? EN_TF : BN_TF;
        try {
          const res = await fetch(
            `${BASE}/tafsirs/${tfId}/by_chapter/${SP.surah}?per_page=300`,
          );
          const data = await res.json();
          const items = data.tafsirs || [];
          items.forEach((item) => {
            const key = item.verse_key;
            if (!key) return;
            const text = cleanTafseer(item.text || "");
            const el = document.querySelector(
              `.sp-tafseer-text[data-key="${key}"][data-type="${lang}"]`,
            );
            if (el)
              el.innerHTML =
                text || '<em style="opacity:.4">Not available</em>';
          });
        } catch (e) {
          console.warn("tafseer load failed", e);
        }
      }

      function toggleSpTafseer(header) {
        const acc = header.closest(".sp-tafseer-acc");
        acc.classList.toggle("open");
        if (acc.classList.contains("open")) {
          const key = acc.dataset.key,
            type = acc.dataset.type;
          const textEl = acc.querySelector(".sp-tafseer-text");
          // Fetch if not already loaded (text is placeholder/loading state)
          const needsFetch = !textEl || textEl.dataset.loaded !== "1";
          if (needsFetch) {
            if (textEl)
              textEl.innerHTML =
                '<span style="opacity:.4;font-style:italic;font-size:13px">Loading…</span>';
            const tfId = type === "en" ? EN_TF : BN_TF;
            fetch(`${BASE}/tafsirs/${tfId}/by_ayah/${key}`)
              .then((r) => r.json())
              .then((d) => {
                const t = d?.tafsir?.text;
                if (textEl) {
                  textEl.innerHTML = t
                    ? cleanTafseer(t)
                    : '<em style="opacity:.4">Not available for this ayah</em>';
                  textEl.dataset.loaded = "1";
                }
              })
              .catch(() => {
                if (textEl)
                  textEl.innerHTML =
                    '<em style="opacity:.4">Failed to load — check connection</em>';
              });
          }
        }
      }

      /* ── Surah Player ─────────────────────────────────── */
      let _spPlayGen = 0;
      let _spWavePeaks = []; // array of 0..1 heights for current ayah
      const SP_BARS = 48; // number of waveform bars

      /* Generate organic-looking fake peaks for waveform */
      function _spMakePeaks() {
        const arr = [];
        for (let i = 0; i < SP_BARS; i++) {
          // bell curve base + random variation
          const x = (i - SP_BARS / 2) / (SP_BARS / 2);
          const bell = Math.exp(-x * x * 1.8);
          const rand = 0.25 + Math.random() * 0.55;
          arr.push(
            Math.max(0.08, Math.min(1, bell * rand + Math.random() * 0.2)),
          );
        }
        // smooth pass
        for (let i = 1; i < arr.length - 1; i++)
          arr[i] = (arr[i - 1] + arr[i] + arr[i + 1]) / 3;
        return arr;
      }

      /* Draw waveform canvas with progress */
      function _spDrawWave(progress) {
        const canvas = document.getElementById("spWaveCanvas");
        if (!canvas) return;
        const wrap = canvas.parentElement;
        const W = wrap.clientWidth || 200;
        const H = 36;
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, W, H);
        const n = _spWavePeaks.length || SP_BARS;
        const barW = Math.max(2, Math.floor((W - n) / n));
        const gap = Math.floor((W - barW * n) / (n + 1));
        const playedColor =
          getComputedStyle(document.documentElement)
            .getPropertyValue("--gold-1")
            .trim() || "#c9a84c";
        const mutedColor =
          document.documentElement.getAttribute("data-theme") === "light"
            ? "rgba(0,0,0,0.18)"
            : "rgba(255,255,255,0.22)";
        const splitBar = Math.floor(progress * n);
        for (let i = 0; i < n; i++) {
          const h = Math.max(
            3,
            Math.round((_spWavePeaks[i] || 0.3) * H * 0.85),
          );
          const x = gap + i * (barW + gap);
          const y = (H - h) / 2;
          ctx.fillStyle = i < splitBar ? playedColor : mutedColor;
          ctx.beginPath();
          ctx.roundRect
            ? ctx.roundRect(x, y, barW, h, 2)
            : ctx.rect(x, y, barW, h);
          ctx.fill();
        }
      }

      /* Update play/pause button icons */
      function _spSetPlayState(playing) {
        const playIcon = document.getElementById("spPlayIcon");
        const pauseIcon = document.getElementById("spPauseIcon");
        const btn = document.getElementById("spPlayBtn");
        if (!playIcon) return;
        if (playing) {
          playIcon.style.display = "none";
          pauseIcon.style.display = "";
          btn.classList.add("playing");
        } else {
          playIcon.style.display = "";
          pauseIcon.style.display = "none";
          btn.classList.remove("playing");
        }
      }

      /* ─────────────────────────────────────────────────────────
   SURAH PAGE AUDIO
───────────────────────────────────────────────────────── */
      /* ─────────────────────────────────────────────────────────
   Fetch a single ayah's audio URL via the same API the main
   page uses — guaranteed to return a real verses.quran.com URL.
   Results are cached in SP.audioUrls so each key is only
   fetched once per surah session.
───────────────────────────────────────────────────────── */
      async function _spFetchAudioUrl(key) {
        // Already have a good URL — return immediately
        const cached = SP.audioUrls[key];
        if (cached && cached.trim()) return cached.trim();

        try {
          const res = await fetch(
            `${BASE}/recitations/${S.reciterId}/by_ayah/${key}`,
          );
          const data = await res.json().catch(() => ({}));
          if (data?.audio_files?.length) {
            const f = data.audio_files[0];
            let url = f.url || f.audio_url || null;
            if (url && url.trim()) {
              url = url.trim();
              if (!url.startsWith("http"))
                url = "https://verses.quran.com/" + url;
              SP.audioUrls[key] = url; // cache for this session
              return url;
            }
          }
        } catch (e) {
          console.warn("_spFetchAudioUrl failed for", key, e);
        }
        return null;
      }

      function spPlayAyah(key, idx) {
        spStopAudio();
        const gen = ++_spPlayGen;
        SP.currentKey = key;

        // Highlight active ayah + inline button
        document
          .querySelectorAll(".sp-ayah")
          .forEach((el) =>
            el.classList.toggle("sp-active", el.dataset.key === key),
          );
        document.querySelectorAll(".sp-play-btn").forEach((btn) => {
          btn.innerHTML = "▶";
          btn.classList.remove("playing");
        });
        const inlineBtn = document.querySelector(
          `.sp-play-btn[data-key="${key}"]`,
        );
        if (inlineBtn) {
          inlineBtn.innerHTML = "⏸";
          inlineBtn.classList.add("playing");
        }

        const ayahNum = SP.verses[idx]?.verse_number || idx + 1;
        const timeEl = document.getElementById("spPlayerTime");
        const ayahEl2 = document.getElementById("spPlayerAyah");
        if (ayahEl2) ayahEl2.textContent = `Ayah ${ayahNum} / ${SP.totalAyahs}`;
        if (timeEl) timeEl.textContent = "0:00";
        _spSetPlayState(false);

        _spWavePeaks = _spMakePeaks();
        _spDrawWave(0);

        setTimeout(() => {
          const el = document.querySelector(`.sp-ayah[data-key="${key}"]`);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 80);

        // Fetch URL (from cache or API), then play
        _spFetchAudioUrl(key).then((url) => {
          if (gen !== _spPlayGen) return; // user moved on

          if (!url) {
            _spSetPlayState(false);
            if (inlineBtn) {
              inlineBtn.innerHTML = "▶";
              inlineBtn.classList.remove("playing");
            }
            showToast("No audio available for Ayah " + ayahNum);
            return;
          }

          const audio = new Audio();
          // ⚠️ NO crossOrigin — verses.quran.com doesn't send CORS headers
          audio.src = url;
          SP.audio = audio;

          const fmt = (t) => {
            const m = Math.floor(t / 60),
              s = Math.floor(t % 60);
            return `${m}:${String(s).padStart(2, "0")}`;
          };

          audio.addEventListener("loadedmetadata", () => {
            if (gen !== _spPlayGen) return;
            if (timeEl) timeEl.textContent = `0:00 / ${fmt(audio.duration)}`;
          });

          audio.addEventListener("timeupdate", () => {
            if (gen !== _spPlayGen) return;
            const cur = audio.currentTime,
              dur = audio.duration || 0;
            if (timeEl)
              timeEl.textContent =
                dur > 0 ? `${fmt(cur)} / ${fmt(dur)}` : fmt(cur);
            if (dur > 0) {
              spHighlightWord(key, cur / dur);
              _spDrawWave(cur / dur);
            }
          });

          audio.addEventListener("ended", () => {
            if (gen !== _spPlayGen) return;
            if ((audio.duration || 0) < 0.5) return; // spurious ended before load
            _spSetPlayState(false);
            _spDrawWave(1);
            const btn2 = document.querySelector(
              `.sp-play-btn[data-key="${key}"]`,
            );
            if (btn2) {
              btn2.innerHTML = "▶";
              btn2.classList.remove("playing");
            }
            spClearHighlight();
            if (SP.loop) {
              audio.currentTime = 0;
              audio.play().catch(() => {});
              _spSetPlayState(true);
              return;
            }
            if (SP.autoPlay)
              setTimeout(() => {
                if (gen === _spPlayGen) spNextAyah();
              }, 400);
          });

          audio.addEventListener("error", () => {
            if (gen !== _spPlayGen) return;
            // Clear cached URL so next attempt re-fetches fresh from API
            delete SP.audioUrls[key];
            _spSetPlayState(false);
            if (inlineBtn) {
              inlineBtn.innerHTML = "▶";
              inlineBtn.classList.remove("playing");
            }
            console.warn("Audio error for", key, audio.error);
            showToast("Audio error for Ayah " + ayahNum);
          });

          audio
            .play()
            .then(() => {
              if (gen !== _spPlayGen) {
                audio.pause();
                return;
              }
              _spSetPlayState(true);
              if (inlineBtn) {
                inlineBtn.innerHTML = "⏸";
                inlineBtn.classList.add("playing");
              }
            })
            .catch((err) => {
              if (gen !== _spPlayGen) return;
              // NotAllowedError = autoplay blocked, user taps play — not a problem
              if (err.name !== "NotAllowedError")
                console.warn("play() error:", err.message);
              _spSetPlayState(false);
            });
        });
      }

      function spWaveSeek(e) {
        if (
          !SP.audio ||
          !SP.audio.src ||
          !isFinite(SP.audio.duration) ||
          SP.audio.duration <= 0
        )
          return;
        const wrap = document.getElementById("spWaveWrap");
        if (!wrap) return;
        const rect = wrap.getBoundingClientRect();
        const pct = Math.max(
          0,
          Math.min((e.clientX - rect.left) / rect.width, 1),
        );
        SP.audio.currentTime = pct * SP.audio.duration;
        _spDrawWave(pct);
      }

      function spHighlightWord(key, progress) {
        const words = document.querySelectorAll(`.sp-word[data-key="${key}"]`);
        if (!words.length) return;
        const idx = Math.min(
          Math.floor(progress * words.length),
          words.length - 1,
        );
        words.forEach((w, i) => w.classList.toggle("highlight", i === idx));
      }
      function spClearHighlight() {
        document
          .querySelectorAll(".sp-word.highlight")
          .forEach((el) => el.classList.remove("highlight"));
      }

      function spTogglePlay() {
        if (SP.audio && SP.audio.src && !SP.audio.ended) {
          const inlineBtn = document.querySelector(
            `.sp-play-btn[data-key="${SP.currentKey}"]`,
          );
          if (SP.audio.paused) {
            SP.audio.play().catch(() => {});
            _spSetPlayState(true);
            if (inlineBtn) {
              inlineBtn.innerHTML = "⏸";
              inlineBtn.classList.add("playing");
            }
          } else {
            SP.audio.pause();
            _spSetPlayState(false);
            if (inlineBtn) {
              inlineBtn.innerHTML = "▶";
              inlineBtn.classList.remove("playing");
            }
          }
          return;
        }
        // No live audio — start from current ayah or first
        if (SP.currentKey && SP.verses.length) {
          const idx = _spCurrentIdx();
          if (idx >= 0) {
            spPlayAyah(SP.currentKey, idx);
            return;
          }
        }
        if (SP.verses.length) spPlayAyah(_spKeyOf(SP.verses[0], 0), 0);
      }

      function spInlineToggle(key, idx) {
        if (
          SP.currentKey === key &&
          SP.audio &&
          SP.audio.src &&
          !SP.audio.ended
        ) {
          spTogglePlay();
          return;
        }
        spPlayAyah(key, idx);
      }

      function _spKeyOf(v, i) {
        return v.verse_key || `${SP.surah}:${v.verse_number || i + 1}`;
      }
      function _spCurrentIdx() {
        if (!SP.currentKey) return -1;
        return SP.verses.findIndex((v, i) => _spKeyOf(v, i) === SP.currentKey);
      }

      function spNextAyah() {
        if (!SP.verses.length) return;
        const cur = _spCurrentIdx();
        const next = Math.min(cur < 0 ? 0 : cur + 1, SP.verses.length - 1);
        spPlayAyah(_spKeyOf(SP.verses[next], next), next);
      }
      function spPrevAyah() {
        if (!SP.verses.length) return;
        const cur = _spCurrentIdx();
        const prev = Math.max(cur <= 0 ? 0 : cur - 1, 0);
        spPlayAyah(_spKeyOf(SP.verses[prev], prev), prev);
      }
      function spStopAudio() {
        if (SP.audio) {
          try {
            SP.audio.pause();
            SP.audio.src = "";
          } catch {}
          SP.audio = null;
        }
        spClearHighlight();
        _spSetPlayState(false);
        document.querySelectorAll(".sp-play-btn").forEach((btn) => {
          btn.innerHTML = "▶";
          btn.classList.remove("playing");
        });
      }
      function toggleSpAuto() {
        SP.autoPlay = !SP.autoPlay;
        document
          .getElementById("spAutoToggle")
          .classList.toggle("on", SP.autoPlay);
      }
      function toggleSpLoop() {
        SP.loop = !SP.loop;
        document
          .getElementById("spLoopBtn")
          .classList.toggle("active", SP.loop);
        if (SP.loop && SP.autoPlay) {
          SP.autoPlay = false;
          document.getElementById("spAutoToggle").classList.remove("on");
        }
        showToast(SP.loop ? "Loop: On ✦" : "Loop: Off");
      }

      /* ══════════════════════════════════════════════════════════
   TAJWEED ENGINE — Full PRD implementation
   Priority: 1 Madd  2 Ghunnah  3 Idgham  4 Iqlab
             5 Ikhfa  6 Qalqalah  7 Lam  8 Waqf
══════════════════════════════════════════════════════════ */
      const TajweedEngine = (() => {
        const SUKOON = "\u0652",
          SHADDAH = "\u0651";
        const TANWIN_F = "\u064B",
          TANWIN_D = "\u064C",
          TANWIN_K = "\u064D";
        const FATHA = "\u064E",
          DAMMA = "\u064F",
          KASRA = "\u0650";
        const SMALL_ALEF = "\u0670",
          MADDAH = "\u0653";

        const ALEF = "\u0627";
        const ALEF_MADDA = "\u0622"; // آ
        const ALEF_WASLA = "\u0671"; // ٱ
        const WAW = "\u0648",
          YA = "\u064A";
        const NOON = "\u0646",
          MEEM = "\u0645",
          LAM = "\u0644";

        const HAMZA_SET = new Set([
          "\u0621",
          "\u0623",
          "\u0625",
          "\u0626",
          "\u0624",
          "\u0671",
          "\u0622",
        ]);

        const WAQF_MAP = {
          "\u06D6": "muraqqas",
          "\u06D7": "mutlaq",
          "\u06D8": "mujawwaz",
          "\u06D9": "mujawwaz",
          "\u06DA": "jaiz",
          "\u06DB": "laazim",
          "\u06DC": "breath",
          "\u06DF": "breath",
          "\u06E0": "mujawwaz",
          "\u06E1": "breath",
        };
        const WAQF_CHARS = new Set(Object.keys(WAQF_MAP));

        const QALQALAH = new Set([
          "\u0642",
          "\u0637",
          "\u0628",
          "\u062C",
          "\u062F",
        ]);
        const IKHFA_L = new Set([
          "\u062A",
          "\u062B",
          "\u062C",
          "\u062F",
          "\u0630",
          "\u0632",
          "\u0633",
          "\u0634",
          "\u0635",
          "\u0636",
          "\u0637",
          "\u0638",
          "\u0641",
          "\u0642",
          "\u0643",
        ]);
        const IDGHAM_L = new Set([
          "\u064A",
          "\u0646",
          "\u0645",
          "\u0648",
          "\u0644",
          "\u0631",
        ]);
        const LAM_SHAMS = new Set([
          "\u062A",
          "\u062B",
          "\u062F",
          "\u0630",
          "\u0631",
          "\u0632",
          "\u0633",
          "\u0634",
          "\u0635",
          "\u0636",
          "\u0637",
          "\u0638",
          "\u0644",
          "\u0646",
        ]);

        function normR(ch) {
          const m = {
            "\u0623": ALEF,
            "\u0625": ALEF,
            "\u0622": ALEF,
            "\u0671": ALEF,
            "\u0649": YA,
            "\u0629": "\u0647",
          };
          return m[ch] || ch;
        }

        const RULES = {
          qalqalah: {
            en: "Qalqalah",
            ar: "قلقلة",
            color: "#c62828",
            darkColor: "#EF9A9A",
            desc: "Echo/bounce on ق ط ب ج د with sukoon.",
            letters: ["ق", "ط", "ب", "ج", "د"],
            letterDesc:
              "5 letters bounce when they have sukoon, especially at end of ayah.",
            conditions: [
              { label: "When", text: "Letter has sukoon ْ." },
              { label: "Minor", text: "Mid-word light bounce." },
              { label: "Major", text: "End of verse strong bounce." },
            ],
          },
          ghunnah: {
            en: "Ghunnah",
            ar: "غنة",
            color: "#E65100",
            darkColor: "#FFCC80",
            desc: "Nasal humming on ن or م with shaddah — 2 counts.",
            letters: ["ن", "م"],
            letterDesc: "ن or م with shaddah always produce nasal sound.",
            conditions: [
              { label: "When", text: "ن or م with shaddah ّ." },
              { label: "Duration", text: "2 counts (harakaat)." },
            ],
          },
          madd: {
            en: "Madd",
            ar: "مد",
            color: "#1565C0",
            darkColor: "#90CAF9",
            desc: "Natural elongation — 2 counts.",
            letters: ["ا", "و", "ي"],
            letterDesc: "ا after fatha, و after damma, ي after kasra.",
            conditions: [
              {
                label: "Natural",
                text: "Vowel + matching madd letter, nothing follows.",
              },
              { label: "Symbol", text: "Superscript alef ٰ or maddah ٓ." },
            ],
          },
          "madd-muttasil": {
            en: "Madd Muttasil",
            ar: "مد متصل",
            color: "#0D47A1",
            darkColor: "#82B1FF",
            desc: "Madd letter + hamza in SAME word — 4–5 counts.",
            letters: ["ا", "و", "ي"],
            letterDesc:
              "Madd letter immediately precedes hamza within same word.",
            conditions: [
              { label: "Pattern", text: "جَاءَ — madd + hamza same word." },
              { label: "Length", text: "4–5 counts (obligatory)." },
            ],
          },
          "madd-munfasil": {
            en: "Madd Munfasil",
            ar: "مد منفصل",
            color: "#1976D2",
            darkColor: "#64B5F6",
            desc: "Madd at end of word, next word starts with hamza — 4–5 counts.",
            letters: ["ا", "و", "ي"],
            letterDesc: "Word ends with madd, next word begins with hamza.",
            conditions: [
              { label: "Pattern", text: "فِي أَنفُسِكُمْ — madd | hamza." },
              { label: "Length", text: "4–5 counts (permitted)." },
            ],
          },
          "madd-lazim": {
            en: "Madd Lazim",
            ar: "مد لازم",
            color: "#0277BD",
            darkColor: "#4FC3F7",
            desc: "Madd followed by permanent sukoon — 6 counts.",
            letters: ["ا", "و", "ي"],
            letterDesc: "Harf madd followed by sukoon that never changes.",
            conditions: [
              { label: "Pattern", text: "الضَّالِّينَ — madd + sukoon." },
              { label: "Length", text: "6 counts — mandatory." },
            ],
          },
          "madd-badal": {
            en: "Madd Badal",
            ar: "مد بدل",
            color: "#01579B",
            darkColor: "#29B6F6",
            desc: "Hamza followed by madd letter — 2 counts.",
            letters: ["ا", "و", "ي"],
            letterDesc: "آمَنُوا — hamza precedes the madd letter.",
            conditions: [
              { label: "Pattern", text: "آ = originally أَاْ — hamza + alef." },
              { label: "Length", text: "2 counts." },
            ],
          },
          "madd-lin": {
            en: "Madd Lin",
            ar: "مد لين",
            color: "#0288D1",
            darkColor: "#81D4FA",
            desc: "وْ or يْ after fatha — softness letters, 2–6 counts at waqf.",
            letters: ["و", "ي"],
            letterDesc: "وْ or يْ after fatha: خَوْف، بَيْت.",
            conditions: [
              { label: "Pattern", text: "Fatha + وْ or يْ: خَوْف." },
              { label: "When", text: "At end of verse only." },
            ],
          },
          ikhfa: {
            en: "Ikhfa",
            ar: "إخفاء",
            color: "#00695C",
            darkColor: "#80DEEA",
            desc: "Concealment — noon/tanwin hidden before 15 letters.",
            letters: [
              "ت",
              "ث",
              "ج",
              "د",
              "ذ",
              "ز",
              "س",
              "ش",
              "ص",
              "ض",
              "ط",
              "ظ",
              "ف",
              "ق",
              "ك",
            ],
            letterDesc: "Noon sakinah or tanwin before 15 ikhfa letters.",
            conditions: [
              {
                label: "Trigger",
                text: "نْ or tanwin ً ٌ ٍ before ikhfa letter.",
              },
              {
                label: "Sound",
                text: "Nasal 2 counts, mouth moves toward next.",
              },
              {
                label: "Shafawi",
                text: "مْ before ب — lips close, nasal tone.",
              },
            ],
          },
          idgham: {
            en: "Idgham",
            ar: "إدغام",
            color: "#2E7D32",
            darkColor: "#A5D6A7",
            desc: "Merging — noon/tanwin blends into يرملون.",
            letters: ["ي", "ر", "م", "ل", "و", "ن"],
            letterDesc: "With Ghunnah (ي ن م و), Without Ghunnah (ل ر).",
            conditions: [
              {
                label: "With Ghunnah",
                text: "نْ/tanwin + ي ن م و — nasal 2 counts.",
              },
              { label: "Without", text: "نْ/tanwin + ل ر — clean merge." },
              {
                label: "Exception",
                text: "No idgham if noon + letters in same word.",
              },
            ],
          },
          iqlab: {
            en: "Iqlab",
            ar: "إقلاب",
            color: "#6A1B9A",
            darkColor: "#CE93D8",
            desc: "Noon sakinah/tanwin → nasal meem before ب.",
            letters: ["ب"],
            letterDesc: "Only ب triggers iqlab.",
            conditions: [
              { label: "Trigger", text: "نْ or tanwin before ب." },
              { label: "Method", text: "Lips close, nasal 2 counts, then ب." },
            ],
          },
          "lam-sh": {
            en: "Lam Shamsiya",
            ar: "لام شمسية",
            color: "#00838F",
            darkColor: "#80CBC4",
            desc: "ال followed by sun letter — lam is silent.",
            letters: [
              "ت",
              "ث",
              "د",
              "ذ",
              "ر",
              "ز",
              "س",
              "ش",
              "ص",
              "ض",
              "ط",
              "ظ",
              "ل",
              "ن",
            ],
            letterDesc: "14 sun letters absorb the lam after ال.",
            conditions: [
              { label: "Pattern", text: "ال + sun letter: الشَّمْس." },
              { label: "Sound", text: "Lam silent, sun letter doubled." },
            ],
          },
          "lam-qm": {
            en: "Lam Qamariya",
            ar: "لام قمرية",
            color: "#006064",
            darkColor: "#A5D6A7",
            desc: "ال followed by moon letter — lam is pronounced.",
            letters: [
              "ا",
              "ب",
              "ج",
              "ح",
              "خ",
              "ع",
              "غ",
              "ف",
              "ق",
              "ك",
              "م",
              "ه",
              "و",
              "ي",
            ],
            letterDesc: "14 moon letters keep lam audible.",
            conditions: [
              { label: "Pattern", text: "ال + moon letter: الْقَمَر." },
              {
                label: "Sound",
                text: "Lam has sukoon and is fully pronounced.",
              },
            ],
          },
        };

        const WAQF_RULES = {
          laazim: {
            sym: "م",
            sym2: "ۛ",
            en: "Waqf Laazim",
            ar: "وقف لازم",
            color: "#c62828",
            desc: "Mandatory stop.",
          },
          mamnu: {
            sym: "لا",
            sym2: "",
            en: "Waqf Mamnu",
            ar: "وقف ممنوع",
            color: "#888",
            desc: "Forbidden stop — must continue.",
          },
          mutlaq: {
            sym: "ط",
            sym2: "ۗ",
            en: "Waqf Mutlaq",
            ar: "وقف مطلق",
            color: "#1565C0",
            desc: "Absolute stop preferred.",
          },
          jaiz: {
            sym: "ج",
            sym2: "ۚ",
            en: "Waqf Jaiz",
            ar: "وقف جائز",
            color: "#2E7D32",
            desc: "Both stopping and continuing fine.",
          },
          mujawwaz: {
            sym: "ز",
            sym2: "ۘ",
            en: "Waqf Mujawwaz",
            ar: "وقف مجوّز",
            color: "#E65100",
            desc: "Stop allowed but continuing better.",
          },
          muraqqas: {
            sym: "ص",
            sym2: "ۖ",
            en: "Waqf Muraqqas",
            ar: "وقف مرخّص",
            color: "#6A1B9A",
            desc: "Continuing preferred.",
          },
          breath: {
            sym: "∽",
            sym2: "ۜ",
            en: "Breath Mark",
            ar: "وقف التنفس",
            color: "#00695C",
            desc: "Brief natural pause.",
          },
        };

        function tokenise(text) {
          const IS_LETTER =
            /[\u0621-\u063A\u0641-\u064A\u0671-\u06D3\u06D5\u066E\u066F]/;
          const IS_MARK = /[\u064B-\u065F\u0610-\u061A\u0670\u06D6-\u06ED]/;
          const units = [];
          let i = 0;
          while (i < text.length) {
            const ch = text[i];
            if (/\s/.test(ch)) {
              units.push({ char: ch, marks: "", isSpace: true });
              i++;
            } else if (WAQF_CHARS.has(ch)) {
              units.push({
                char: ch,
                marks: "",
                isWaqf: true,
                waqfType: WAQF_MAP[ch],
              });
              i++;
            } else if (IS_LETTER.test(ch)) {
              const u = { char: ch, marks: "" };
              i++;
              while (i < text.length && IS_MARK.test(text[i])) {
                if (WAQF_CHARS.has(text[i])) break;
                u.marks += text[i++];
              }
              units.push(u);
            } else {
              if (units.length) units[units.length - 1].marks += ch;
              else units.push({ char: ch, marks: "", isPunct: true });
              i++;
            }
          }
          return units;
        }

        function nli(units, i) {
          for (let j = i + 1; j < units.length; j++)
            if (!units[j].isSpace && !units[j].isWaqf && !units[j].isPunct)
              return j;
          return -1;
        }
        function pli(units, i) {
          for (let j = i - 1; j >= 0; j--)
            if (!units[j].isSpace && !units[j].isWaqf && !units[j].isPunct)
              return j;
          return -1;
        }

        function annotate(text) {
          const units = tokenise(text);
          const out = units.map((u) => ({
            raw: u.char + (u.marks || ""),
            cls: null,
            isWaqf: u.isWaqf || false,
            waqfType: u.waqfType || null,
          }));

          for (let i = 0; i < units.length; i++) {
            const u = units[i];
            if (u.isSpace || u.isPunct || u.isWaqf) continue;
            const m = u.marks || "",
              base = u.char,
              bn = normR(base);

            const hasSukoon = m.includes(SUKOON);
            const hasShaddah = m.includes(SHADDAH);
            const hasTanwin =
              m.includes(TANWIN_F) ||
              m.includes(TANWIN_D) ||
              m.includes(TANWIN_K);
            const hasFatha = m.includes(FATHA);
            const hasDamma = m.includes(DAMMA);
            const hasKasra = m.includes(KASRA);
            const hasMaddah = m.includes(MADDAH) || m.includes(SMALL_ALEF);

            const ni = nli(units, i);
            const next = ni >= 0 ? units[ni] : null;
            const pi = pli(units, i);
            const prev = pi >= 0 ? units[pi] : null;
            const pn = prev ? normR(prev.char) : null;
            const nn = next ? normR(next.char) : null;
            const pm = prev ? prev.marks || "" : "";

            // ① MADD BADAL — آ directly
            if (base === ALEF_MADDA) {
              out[i].cls = "madd-badal";
              continue;
            }

            // ② MADD with maddah/small-alef mark
            if (hasMaddah) {
              if (next && !next.isSpace && HAMZA_SET.has(next.char)) {
                out[i].cls = "madd-muttasil";
                continue;
              }
              if (next && (next.marks || "").includes(SUKOON)) {
                out[i].cls = "madd-lazim";
                continue;
              }
              out[i].cls = "madd";
              continue;
            }

            // ③ Natural MADD letter patterns
            const isAlefMadd = bn === ALEF && !m && prev && pm.includes(FATHA);
            const isWawMadd =
              bn === WAW && (hasSukoon || !m) && prev && pm.includes(DAMMA);
            const isYaMadd =
              bn === YA && (hasSukoon || !m) && prev && pm.includes(KASRA);
            if (isAlefMadd || isWawMadd || isYaMadd) {
              if (next && !next.isSpace && HAMZA_SET.has(next.char)) {
                out[i].cls = "madd-muttasil";
                continue;
              }
              if (
                next &&
                (next.marks || "").includes(SUKOON) &&
                !next.isSpace
              ) {
                out[i].cls = "madd-lazim";
                continue;
              }
              out[i].cls = "madd";
              continue;
            }

            // ④ MADD LIN — وْ or يْ after fatha
            if (
              (bn === WAW || bn === YA) &&
              hasSukoon &&
              prev &&
              pm.includes(FATHA)
            ) {
              out[i].cls = "madd-lin";
              continue;
            }

            // ⑤ GHUNNAH
            if ((base === NOON || base === MEEM) && hasShaddah) {
              out[i].cls = "ghunnah";
              continue;
            }

            // ⑥ NOON SAKINAH / TANWIN rules (cross-word: next token = first letter of next word)
            if ((base === NOON && hasSukoon) || hasTanwin) {
              if (next) {
                if (nn === "\u0628") {
                  out[i].cls = "iqlab";
                  continue;
                } else if (IDGHAM_L.has(nn)) {
                  out[i].cls = "idgham";
                  continue;
                } else if (IKHFA_L.has(nn)) {
                  out[i].cls = "ikhfa";
                  continue;
                }
              }
            }

            // ⑦ IKHFA SHAFAWI — مْ before ب
            if (base === MEEM && hasSukoon && next && nn === "\u0628") {
              out[i].cls = "ikhfa";
              continue;
            }

            // ⑧ QALQALAH
            if (QALQALAH.has(base) && hasSukoon) {
              out[i].cls = "qalqalah";
              continue;
            }

            // ⑨ LAM SHAMSIYA / QAMARIYA — lam with sukoon after alef (ال pattern)
            if (base === LAM && hasSukoon) {
              const prevIsAlef =
                prev && (normR(prev.char) === ALEF || prev.char === ALEF_WASLA);
              if (prevIsAlef && next) {
                out[i].cls = LAM_SHAMS.has(nn) ? "lam-sh" : "lam-qm";
                continue;
              }
            }
          }
          return out;
        }

        function renderWord(text) {
          return annotate(text)
            .map(({ raw, cls, isWaqf, waqfType }) => {
              if (isWaqf) {
                const wr = WAQF_RULES[waqfType];
                if (!wr) return raw;
                // data-sym used by CSS ::before to render the symbol scaled inside the circle
                return `<span class="tj-waqf tj-waqf-${waqfType}" data-waqf="${waqfType}" data-sym="${wr.sym || raw}" title="${wr.en}"></span>`;
              }
              return cls
                ? `<span class="tj-${cls}" data-tj="${cls}">${raw}</span>`
                : raw;
            })
            .join("");
        }

        function render(words) {
          return words.map((w) => renderWord(w));
        }

        function buildLegend() {
          const el = document.getElementById("tjLegend");
          if (!el) return;
          const isDark =
            document.documentElement.getAttribute("data-theme") === "dark";
          const col = (r) => (r.darkColor && isDark ? r.darkColor : r.color);
          const item = (
            k,
            r,
          ) => `<div class="tj-legend-item" onclick="TajweedEngine.openDash('${k}')" title="${r.en}">
      <div class="tj-legend-dot" style="background:${col(r)}"></div>
      <span class="tj-legend-en" style="color:${col(r)}">${r.en}</span>
      <span class="tj-legend-ar">${r.ar}</span></div>`;
          const witem = (
            k,
            r,
          ) => `<div class="tj-legend-item" onclick="TajweedEngine.openDash('waqf')" title="${r.en}">
      <div class="tj-legend-dot" style="background:${r.color}"></div>
      <span class="tj-legend-en" style="color:${r.color}">${r.sym}</span>
      <span class="tj-legend-ar" style="opacity:.8">${r.en}</span></div>`;
          const coreKeys = [
            "qalqalah",
            "ghunnah",
            "madd",
            "ikhfa",
            "idgham",
            "iqlab",
          ];
          const maddKeys = [
            "madd-muttasil",
            "madd-munfasil",
            "madd-lazim",
            "madd-badal",
            "madd-lin",
          ];
          el.innerHTML = `
      <div class="tj-legend-section">
        <div class="tj-legend-title">Core Tajweed Rules — click to learn more</div>
        <div class="tj-legend-row">${coreKeys.map((k) => item(k, RULES[k])).join("")}${item("lam-sh", RULES["lam-sh"])}${item("lam-qm", RULES["lam-qm"])}</div>
      </div>
      <div class="tj-legend-divider"></div>
      <div class="tj-legend-section">
        <div class="tj-legend-title">Madd Types — elongation</div>
        <div class="tj-legend-row">${maddKeys.map((k) => item(k, RULES[k])).join("")}</div>
      </div>
      <div class="tj-legend-divider"></div>
      <div class="tj-legend-section">
        <div class="tj-legend-title">Waqf Signs — click to open guide</div>
        <div class="tj-legend-row">${Object.entries(WAQF_RULES)
          .map(([k, r]) => witem(k, r))
          .join("")}</div>
      </div>`;
        }

        function initTooltip() {
          const tip = document.getElementById("tjTooltip");
          const tipAr = document.getElementById("tjTipAr");
          const tipRule = document.getElementById("tjTipRule");
          const tipDesc = document.getElementById("tjTipDesc");
          if (!tip) return;
          function show(e) {
            const span = e.target.closest("[data-tj],[data-waqf]");
            if (!span) {
              tip.classList.remove("show");
              return;
            }
            const key = span.dataset.tj || span.dataset.waqf;
            const r = span.dataset.waqf ? WAQF_RULES[key] : RULES[key];
            if (!r) return;
            const isDark =
              document.documentElement.getAttribute("data-theme") === "dark";
            const col = r.darkColor && isDark ? r.darkColor : r.color;
            tipAr.textContent = r.ar;
            tipAr.style.color = col;
            tipRule.textContent = r.en;
            tipRule.style.color = col;
            tipDesc.textContent = r.desc;
            tip.classList.add("show");
            move(e);
          }
          function move(e) {
            tip.style.left =
              Math.min(e.clientX + 16, window.innerWidth - 260) + "px";
            tip.style.top = Math.max(e.clientY - 12, 8) + "px";
          }
          function hide(e) {
            if (!e.relatedTarget?.closest("[data-tj],[data-waqf]"))
              tip.classList.remove("show");
          }
          const content = document.getElementById("spContent");
          if (content) {
            content.addEventListener("mouseover", show);
            content.addEventListener("mousemove", move);
            content.addEventListener("mouseout", hide);
          }
        }

        let _dashOpen = false,
          _dashTab = "qalqalah";
        function buildDashContent(tab) {
          const tabs = document.getElementById("tjDashTabs");
          const body = document.getElementById("tjDashBody");
          if (!tabs || !body) return;
          const allTabs = [...Object.keys(RULES), "waqf"];
          const tm = {
            ...RULES,
            waqf: {
              en: "Waqf",
              ar: "وقف",
              color: "#607D8B",
              darkColor: "#90A4AE",
            },
          };
          const isDark =
            document.documentElement.getAttribute("data-theme") === "dark";
          const col = (r) => (r.darkColor && isDark ? r.darkColor : r.color);
          tabs.innerHTML = allTabs
            .map(
              (
                k,
              ) => `<div class="tj-dash-tab${k === tab ? " active" : ""}" onclick="TajweedEngine.openDash('${k}')">
      <div class="tab-dot" style="background:${col(tm[k])}"></div>${tm[k].en}</div>`,
            )
            .join("");
          body.innerHTML = "";
          allTabs.forEach((k) => {
            const panel = document.createElement("div");
            panel.className = "tj-dash-panel" + (k === tab ? " active" : "");
            if (k === "waqf") {
              panel.innerHTML = `<div class="tj-rule-hd">
          <div class="tj-rule-badge" style="background:rgba(96,125,139,.15);color:#607D8B;border:2px solid rgba(96,125,139,.3)">وقف</div>
          <div class="tj-rule-meta"><h2>Waqf — Stopping Signs</h2><div class="tj-rule-ar" style="color:#607D8B">علامات الوقف</div>
          <p>Waqf marks tell the reciter where to stop, pause, or continue in recitation.</p></div></div>
          <table class="tj-waqf-table"><thead><tr><th>Sign</th><th>Unicode</th><th>Name</th><th>Rule</th></tr></thead>
          <tbody>${Object.entries(WAQF_RULES)
            .map(
              ([k, r]) => `<tr>
            <td><span class="tj-waqf tj-waqf-${k}" data-sym="${r.sym}" style="cursor:default;position:static;top:0;vertical-align:middle"></span></td>
            <td style="font-size:.6rem;color:var(--text3);font-family:monospace">${r.sym2 || "—"}</td>
            <td><span class="tj-waqf-name" style="color:${r.color}">${r.en}</span><br><span style="font-family:var(--arabic-font);font-size:.9rem">${r.ar}</span></td>
            <td>${r.desc}</td></tr>`,
            )
            .join("")}</tbody></table>`;
            } else {
              const r = RULES[k],
                c = col(r);
              panel.innerHTML = `<div class="tj-rule-hd">
          <div class="tj-rule-badge" style="background:${c}22;color:${c};border:2px solid ${c}44">${r.ar}</div>
          <div class="tj-rule-meta"><h2 style="color:${c}">${r.en}</h2>
          <div class="tj-rule-ar" style="color:${c}">${r.ar}</div><p>${r.desc}</p></div></div>
          <div style="margin:.5rem 0">
            <div class="tj-legend-title" style="text-align:left;margin-bottom:.4rem">Letters Affected</div>
            <div class="tj-letter-grid">${r.letters.map((l) => `<span class="tj-letter-chip" style="color:${c};border-color:${c}44;background:${c}11">${l}</span>`).join("")}</div>
            <div style="font-size:.68rem;color:var(--text2);line-height:1.7;margin-top:.3rem;font-family:'Spectral',serif">${r.letterDesc}</div>
          </div>
          <div class="tj-conditions">${r.conditions
            .map(
              (cd) => `<div class="tj-cond-row">
            <div class="tj-cond-label" style="color:${c}">${cd.label}</div>
            <div class="tj-cond-text">${cd.text}</div></div>`,
            )
            .join("")}</div>`;
            }
            body.appendChild(panel);
          });
        }
        function openDash(tab) {
          _dashTab = tab || "qalqalah";
          buildDashContent(_dashTab);
          document.getElementById("tjDashboard")?.classList.add("open");
          _dashOpen = true;
        }
        function closeDash() {
          document.getElementById("tjDashboard")?.classList.remove("open");
          _dashOpen = false;
        }
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && _dashOpen) closeDash();
        });

        return {
          render,
          renderWord,
          buildLegend,
          initTooltip,
          openDash,
          closeDash,
          getRules: () => RULES,
        };
      })();

      let _pdfWithTajweed = true;
      function spDownloadPDF() {
        document.getElementById("pdfModal").classList.add("open");
      }
      function closePdfModal() {
        document.getElementById("pdfModal").classList.remove("open");
      }
      function selectPdfOpt(withTajweed) {
        _pdfWithTajweed = withTajweed;
        document
          .getElementById("pdfOptTajOn")
          .classList.toggle("selected", withTajweed);
        document
          .getElementById("pdfOptTajOff")
          .classList.toggle("selected", !withTajweed);
      }
      function confirmPdfDownload() {
        closePdfModal();
        // Force light theme for PDF (better on paper)
        const prevTheme = S.theme;
        document.documentElement.setAttribute("data-theme", "light");
        // Strip tajweed colors if user wants plain
        if (!_pdfWithTajweed) {
          document.body.classList.add("print-no-tajweed");
        }
        // Make sure surah page is open and visible for print
        const sp = document.getElementById("surahPage");
        const wasOpen = sp.classList.contains("open");
        if (!wasOpen) sp.classList.add("open");
        // Inject a hidden print-only title bar at top of spContent
        const titleBar = document.createElement("div");
        titleBar.id = "_pdf_title_bar";
        titleBar.style.cssText = "display:none";
        titleBar.className = "_pdf_title_print";
        const surahName = getSurahName(SP.surah || S.surah);
        const totalAyahs =
          SP.totalAyahs || SURAH_LENGTHS[SP.surah || S.surah] || 0;
        titleBar.innerHTML = `<div style="text-align:center;padding:8px 0 16px;border-bottom:2px solid #c9a84c;margin-bottom:0">
    <div style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:.3em;color:#8a6510;text-transform:uppercase;margin-bottom:8px">Tarteel · Quran</div>
    <div style="font-family:'Cinzel',serif;font-size:28px;color:#8a6510;letter-spacing:.2em">${surahName}</div>
    <div style="font-family:'Cinzel',serif;font-size:10px;letter-spacing:.2em;color:#999;margin-top:4px">Surah ${SP.surah || S.surah} · ${totalAyahs} Ayahs · ${_pdfWithTajweed ? "With Tajweed Colors" : "Plain Text"}</div>
  </div>`;
        const spContent = document.getElementById("spContent");
        if (spContent) spContent.prepend(titleBar);
        // Add print-only style to show title bar
        const style = document.createElement("style");
        style.id = "_pdf_extra_style";
        style.textContent = `@media print { ._pdf_title_print { display:block!important; } }`;
        document.head.appendChild(style);

        setTimeout(() => {
          window.print();
          // Restore everything after print dialog
          setTimeout(() => {
            document.body.classList.remove("print-no-tajweed");
            document.documentElement.setAttribute("data-theme", prevTheme);
            if (!wasOpen) sp.classList.remove("open");
            const tb = document.getElementById("_pdf_title_bar");
            if (tb) tb.remove();
            const st = document.getElementById("_pdf_extra_style");
            if (st) st.remove();
          }, 800);
        }, 200);
      }
      async function shareImage() {
        if (!S.verseData || typeof html2canvas === "undefined") {
          showToast("Preparing image…");
          return;
        }
        const verse = S.verseData.verse;
        const trans = (verse.translations || []).find(
          (t) => Number(t.resource_id) === EN_TR,
        );
        document.getElementById("scArabic").textContent =
          verse.text_uthmani || "";
        document.getElementById("scTrans").textContent = trans
          ? cleanText(trans.text)
          : "";
        document.getElementById("scRef").textContent =
          `${getSurahName(S.surah)} · ${S.surah}:${S.ayah}`;

        const card = document.getElementById("shareCard");
        // Apply current theme to card
        if (S.theme === "light") {
          card.classList.add("light-card");
        } else {
          card.classList.remove("light-card");
        }

        // Temporarily make visible for capture
        card.parentElement.style.top = "0";
        card.parentElement.style.left = "0";
        card.parentElement.style.zIndex = "-1";
        card.parentElement.style.opacity = "0";

        try {
          const canvas = await html2canvas(card, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            width: 600,
            height: card.scrollHeight,
          });
          card.parentElement.style.top = "-9999px";
          card.parentElement.style.left = "-9999px";
          card.parentElement.style.opacity = "1";

          canvas.toBlob(async (blob) => {
            if (!blob) {
              showToast("Image failed");
              return;
            }
            const file = new File([blob], "tarteel-ayah.png", {
              type: "image/png",
            });
            if (
              navigator.share &&
              navigator.canShare &&
              navigator.canShare({ files: [file] })
            ) {
              try {
                await navigator.share({
                  files: [file],
                  title: `Quran ${S.surah}:${S.ayah}`,
                  text: `${getSurahName(S.surah)} ${S.surah}:${S.ayah}`,
                });
                return;
              } catch (e) {
                if (e.name === "AbortError") return;
              }
            }
            // Download fallback
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `tarteel-${S.surah}-${S.ayah}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast("Image saved ✦");
          }, "image/png");
        } catch (e) {
          console.error("html2canvas:", e);
          card.parentElement.style.top = "-9999px";
          card.parentElement.style.left = "-9999px";
          card.parentElement.style.opacity = "1";
          showToast("Image export failed");
        }
      }

      /* ══════════════════════════════════════════════════════════
   COPY / SHARE
══════════════════════════════════════════════════════════ */
      function _buildShareText() {
        const v = S.verseData.verse;
        const en = (v.translations || []).find(
          (t) => Number(t.resource_id) === EN_TR,
        );
        return `${v.text_uthmani || ""}\n\n"${en ? cleanText(en.text) : ""}"\n(${getSurahName(S.surah)}, ${S.surah}:${S.ayah})`;
      }
      function _clipboardFallback(txt) {
        try {
          const ta = document.createElement("textarea");
          ta.value = txt;
          ta.style.cssText =
            "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0";
          document.body.appendChild(ta);
          ta.focus();
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
          showToast("Copied ✦");
        } catch {
          showToast("Could not copy");
        }
      }
      function copyAyah() {
        if (!S.verseData) return;
        const txt = _buildShareText();
        if (navigator.clipboard?.writeText)
          navigator.clipboard
            .writeText(txt)
            .then(() => showToast("Copied ✦"))
            .catch(() => _clipboardFallback(txt));
        else _clipboardFallback(txt);
      }
      function shareAyah() {
        if (!S.verseData) return;
        const txt = _buildShareText();
        if (navigator.share)
          navigator
            .share({ title: `Quran ${S.surah}:${S.ayah}`, text: txt })
            .catch(() => copyAyah());
        else copyAyah();
      }

      /* ══════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════ */
      let toastTm;
      function showToast(msg) {
        const el = document.getElementById("toast");
        el.textContent = msg;
        el.classList.add("show");
        clearTimeout(toastTm);
        toastTm = setTimeout(() => el.classList.remove("show"), 2500);
      }