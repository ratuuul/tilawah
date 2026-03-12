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

      /*
  Verified Quran.com API resource IDs:
  Translations:
    131 = The Clear Quran (Dr. Mustafa Khattab) — English
    161 = Taisirul Quran (Abu Bakr Zakaria)     — Bangla
  Tafsir:
    169 = Tafsir Ibn Kathir (En, abridged)
    164 = Tafsir Ahsanul Bayaan                 — Bangla
*/
      const EN_TR = 20; // Saheeh International
      const BN_TR = 161;
      const EN_TF = 169;
      const BN_TF = 164;

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
      };

      /* ══════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════ */
      document.addEventListener("DOMContentLoaded", () => {
        try {
          S.bookmarks = JSON.parse(localStorage.getItem("qbm") || "[]");
        } catch {}
        S.theme = localStorage.getItem("qtheme") || "dark";
        applyTheme(S.theme);
        updateBookmarkBadge();
        renderBookmarkList();
        loadRandomAyah();
      });

      /* ══════════════════════════════════════════════════════════
   THEME
══════════════════════════════════════════════════════════ */
      function applyTheme(t) {
        S.theme = t;
        document.documentElement.setAttribute("data-theme", t);
        const dark = document.getElementById("themeIconDark");
        const light = document.getElementById("themeIconLight");
        if (dark) dark.style.display = t === "dark" ? "" : "none";
        if (light) light.style.display = t === "light" ? "" : "none";
        try {
          localStorage.setItem("qtheme", t);
        } catch {}
        // Redraw waveform in new theme colours
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

      // Track in-flight request so stale ones are ignored
      let _reqId = 0;
      // Track retry timer so it can be cancelled
      let _retryTimer = null;

      function _setNavBtns(loading) {
        const prev = document.getElementById("prevBtn");
        const next = document.getElementById("nextBtn");
        if (loading) {
          prev.disabled = true;
          next.disabled = true;
        } else {
          prev.disabled = S.surah === 1 && S.ayah === 1;
          next.disabled = S.surah === 114 && S.ayah === SURAH_LENGTHS[114];
        }
      }

      function loadRandomAyah() {
        const surah = Math.floor(Math.random() * 114) + 1;
        const ayah = Math.floor(Math.random() * SURAH_LENGTHS[surah]) + 1;
        const ref = S.dailyMode ? getDailyRef() : { surah, ayah };
        loadAyah(ref.surah, ref.ayah);
      }

      function navigateAyah(delta) {
        if (!S.surah) return;
        let s = S.surah;
        let a = S.ayah + delta;
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

      /* ══════════════════════════════════════════════════════════
   DATA FETCHING
══════════════════════════════════════════════════════════ */
      async function loadAyah(surah, ayah) {
        // Cancel any pending retry timer
        if (_retryTimer) {
          clearTimeout(_retryTimer);
          _retryTimer = null;
        }

        // Unique ID for this request — stale completions are silently dropped
        const id = ++_reqId;

        _setNavBtns(true);
        showLoading(true);
        destroyWavesurfer();

        // Optimistically update state so navigation math stays correct
        S.surah = surah;
        S.ayah = ayah;

        const key = `${surah}:${ayah}`;
        const BASE = "https://api.quran.com/api/v4";

        try {
          const [vRes, aRes, tfEnRes, tfBnRes] = await Promise.all([
            fetch(
              `${BASE}/verses/by_key/${key}?words=true&word_fields=text_uthmani&fields=text_uthmani&translations=${EN_TR},${BN_TR}`,
            ),
            fetch(`${BASE}/recitations/7/by_ayah/${key}`),
            fetch(`${BASE}/tafsirs/${EN_TF}/by_ayah/${key}`),
            fetch(`${BASE}/tafsirs/${BN_TF}/by_ayah/${key}`),
          ]);

          // Drop if a newer request started while we were awaiting
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
          showToast("Network error — retrying in 2s…");
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
          showToast("No verse data — try another");
          return;
        }

        /* Labels */
        const name = getSurahName(S.surah);
        const totalAyahs = SURAH_LENGTHS[S.surah];
        document.getElementById("surahNameEn").textContent = name;
        document.getElementById("surahNum").textContent =
          `Surah ${S.surah} · ${totalAyahs} Ayahs`;
        document.getElementById("ayahNum").textContent = `Ayah ${S.ayah}`;
        document.getElementById("navLabel").textContent =
          `${name} ${S.surah}:${S.ayah}`;

        /* ── Arabic ───────────────────────────────────────────── */
        const arabicEl = document.getElementById("arabicText");
        let arabicHtml = "";

        const words = (verse.words || []).filter(
          (w) => w.char_type_name !== "end",
        );
        if (words.length) {
          arabicHtml = words
            .map((w, i) => {
              const txt = w.text_uthmani || w.text || "";
              return `<span class="arabic-word" data-index="${i}">${txt}</span>`;
            })
            .join(" ");
        } else if (verse.text_uthmani) {
          arabicHtml = verse.text_uthmani
            .split(/\s+/)
            .filter(Boolean)
            .map(
              (w, i) =>
                `<span class="arabic-word" data-index="${i}">${w}</span>`,
            )
            .join(" ");
        } else {
          arabicHtml =
            "<span style='opacity:.4;font-size:14px'>Arabic text unavailable</span>";
        }
        arabicEl.innerHTML = arabicHtml;

        /* ── Translations ─────────────────────────────────────── */
        const trans = verse.translations || [];
        const enT = trans.find((t) => Number(t.resource_id) === EN_TR);
        const bnT = trans.find((t) => Number(t.resource_id) === BN_TR);

        document.getElementById("enText").textContent = enT
          ? cleanText(enT.text)
          : "Translation not available.";
        document.getElementById("bnText").textContent = bnT
          ? cleanText(bnT.text)
          : "অনুবাদ পাওয়া যায়নি।";

        /* ── Tafseers — from dedicated /tafsirs/{id}/by_ayah endpoint ── */
        // Response shape: { tafsir: { text: "..." } }
        const enFText = tfEnData?.tafsir?.text;
        const bnFText = tfBnData?.tafsir?.text;

        document.getElementById("tafseerEnContent").innerHTML = enFText
          ? `<div>${cleanTafseer(enFText)}</div>`
          : '<em style="opacity:.45">Tafseer not available for this ayah.</em>';
        document.getElementById("tafseerBnContent").innerHTML = bnFText
          ? `<div>${cleanTafseer(bnFText)}</div>`
          : '<em style="opacity:.45">তাফসীর এই আয়াতের জন্য পাওয়া যায়নি।</em>';

        /* ── Audio ────────────────────────────────────────────── */
        let audioUrl = null;
        if (aData?.audio_files?.length) {
          const f = aData.audio_files[0];
          audioUrl = f.url || f.audio_url || null;
          if (audioUrl && !audioUrl.startsWith("http"))
            audioUrl = "https://verses.quran.com/" + audioUrl;
        }
        initWavesurfer(audioUrl);
        updateBookmarkButton();

        /* Animate card in */
        const card = document.getElementById("ayahCard");
        card.style.animation = "none";
        void card.offsetHeight;
        card.style.animation = "fadeInCard .55s ease";
      }

      /* ══════════════════════════════════════════════════════════
   TEXT UTILITIES
══════════════════════════════════════════════════════════ */
      function esc(t) {
        return t
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }

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
          .replace(/<strong>/g, "<strong>")
          .replace(/<\/strong>/g, "</strong>")
          .replace(/<em>/g, "<em>")
          .replace(/<\/em>/g, "</em>")
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
      let _waveRAF = null;
      let _audioCtx = null;
      let _waveData = null;
      let _peaksLoading = false;

      function _getThemeColor() {
        return (
          getComputedStyle(document.documentElement)
            .getPropertyValue("--gold-1")
            .trim() || "#c9a84c"
        );
      }

      function _resizeCanvas() {
        const canvas = document.getElementById("waveCanvas");
        if (!canvas) return;
        const wrap = document.getElementById("waveformWrap");
        canvas.width = wrap.offsetWidth * devicePixelRatio;
        canvas.height = 64 * devicePixelRatio;
        canvas.style.width = wrap.offsetWidth + "px";
        canvas.style.height = "64px";
      }

      function _drawStaticWave(peaks, progress) {
        const canvas = document.getElementById("waveCanvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const W = canvas.width,
          H = canvas.height;
        const mid = H / 2;
        const col = _getThemeColor();
        const totalW = W;
        const barW = totalW / peaks.length;
        const gap = Math.max(1 * devicePixelRatio, barW * 0.25);
        ctx.clearRect(0, 0, W, H);

        const splitX = Math.floor(progress * W);

        peaks.forEach((p, i) => {
          const x = i * barW;
          const h = Math.max(2 * devicePixelRatio, p * H * 0.85);
          const played = x < splitX;

          if (played) {
            const g = ctx.createLinearGradient(x, mid - h / 2, x, mid + h / 2);
            g.addColorStop(0, col + "aa");
            g.addColorStop(0.5, col);
            g.addColorStop(1, col + "aa");
            ctx.fillStyle = g;
          } else {
            ctx.fillStyle =
              getComputedStyle(document.documentElement)
                .getPropertyValue("--border")
                .trim() || "rgba(255,255,255,.13)";
          }
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

        // Playhead needle
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
        const raw = buffer.getChannelData(0);
        const step = Math.floor(raw.length / numBars);
        const peaks = [];
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

      /* Decode audio for peaks — only called after first user gesture */
      async function _initPeaks(url) {
        if (_peaksLoading) return;
        _peaksLoading = true;
        try {
          const resp = await fetch(url);
          const buf = await resp.arrayBuffer();
          // OfflineAudioContext doesn't require a user gesture
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
          const ph = document.getElementById("waveformPlaceholder");
          const canvas = document.getElementById("waveCanvas");
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

      function initWavesurfer(url) {
        destroyWavesurfer();
        _resizeCanvas();

        const ph = document.getElementById("waveformPlaceholder");
        const canvas = document.getElementById("waveCanvas");
        ph.style.display = "flex";
        canvas.style.display = "none";
        document.getElementById("playerTime").textContent = "0:00 / 0:00";
        const pb = document.getElementById("playBtn");
        pb.textContent = "▶";
        pb.classList.remove("playing");

        if (!url) {
          ph.innerHTML =
            '<span style="font-size:12px;color:var(--text2);letter-spacing:.1em;font-family:Spectral,serif">Audio not available</span>';
          return;
        }

        try {
          const audio = new Audio();
          audio.crossOrigin = "anonymous";
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
              // Create AudioContext for actual playback on user gesture
              if (!_audioCtx) {
                _audioCtx = new (
                  window.AudioContext || window.webkitAudioContext
                )();
              }
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

          // Start decoding waveform immediately — OfflineAudioContext needs no gesture
          _initPeaks(url);

          audio.addEventListener("loadedmetadata", () => {
            document.getElementById("playerTime").textContent =
              `0:00 / ${fmt(ws.getDuration())}`;
          });

          audio.addEventListener("timeupdate", () => {
            document.getElementById("playerTime").textContent =
              `${fmt(audio.currentTime)} / ${fmt(ws.getDuration())}`;
            if (_waveData) {
              _drawStaticWave(
                _waveData,
                audio.duration ? audio.currentTime / audio.duration : 0,
              );
            }
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
              '<span style="font-size:12px;color:var(--text2);letter-spacing:.1em;font-family:Spectral,serif">Audio unavailable</span>';
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
        const canvas = document.getElementById("waveCanvas");
        if (canvas) {
          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        }
      }

      function seekByClick(e) {
        if (!S.wavesurfer) return;
        const wrap = document.getElementById("waveformWrap");
        const pct = e.offsetX / wrap.offsetWidth;
        S.wavesurfer.seekTo(Math.max(0, Math.min(1, pct)));
      }

      window.addEventListener("resize", () => {
        _resizeCanvas();
        const audio = S.wavesurfer?._audio;
        if (_waveData)
          _drawStaticWave(
            _waveData,
            audio?.duration ? audio.currentTime / audio.duration : 0,
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
   High-contrast: white text on semi-opaque bg (dark)
                  dark text on gold bg (light)
══════════════════════════════════════════════════════════ */
      let hlTimer = null;
      function startHighlight(ws) {
        clearHighlight();
        const words = document.querySelectorAll(".arabic-word");
        if (!words.length) return;
        hlTimer = setInterval(() => {
          const dur = ws.getDuration();
          const cur = ws.getCurrentTime();
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
          });
          showToast("Ayah bookmarked ✦");
        } else {
          S.bookmarks.splice(idx, 1);
          showToast("Bookmark removed");
        }
        try {
          localStorage.setItem("qbm", JSON.stringify(S.bookmarks));
        } catch {}
        updateBookmarkButton();
        updateBookmarkBadge();
        renderBookmarkList();
      }

      function updateBookmarkButton() {
        const saved = S.bookmarks.some((b) => b.key === `${S.surah}:${S.ayah}`);
        const btn = document.getElementById("bookmarkBtn");
        btn.classList.toggle("bookmarked", saved);
        const svgFill = saved ? "var(--gold-1)" : "none";
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="${svgFill}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
          ${saved ? "Saved" : "Save"}`;
      }

      function updateBookmarkBadge() {
        const n = S.bookmarks.length;
        const el = document.getElementById("bookmarkCount");
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
    <div class="bookmark-item" onclick="loadBookmarkItem('${b.key}')">
      <div class="bookmark-ref">${b.surahName} · ${b.key}</div>
      <div class="bookmark-arabic" dir="rtl">${b.arabic.split(" ").slice(0, 6).join(" ")}…</div>
      <div class="bookmark-trans">${(b.translation || "").substring(0, 100)}…</div>
    </div>`,
          )
          .join("");
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
        document.getElementById("drawerOverlay").classList.remove("open");
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
          showToast("Copied to clipboard ✦");
        } catch {
          showToast("Could not copy — please copy manually");
        }
      }

      function copyAyah() {
        if (!S.verseData) return;
        const txt = _buildShareText();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(txt)
            .then(() => showToast("Copied to clipboard ✦"))
            .catch(() => _clipboardFallback(txt));
        } else {
          _clipboardFallback(txt);
        }
      }

      function shareAyah() {
        if (!S.verseData) return;
        const txt = _buildShareText();
        if (navigator.share) {
          navigator
            .share({ title: `Quran ${S.surah}:${S.ayah}`, text: txt })
            .catch(() => copyAyah());
        } else {
          copyAyah();
        }
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

      /* ══════════════════════════════════════════════════════════
   SURAH NAMES
══════════════════════════════════════════════════════════ */
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