# AYAtlas Constitution (Anayasası)

AYAtlas, AykenOS (`kenanay/AykenOS`) repository'sini salt-okunur olarak inceleyen, mimarisini, veri katmanlarını, execution modellerini, governance kararlarını ve kanıt sınırlarını anlamlandırarak görselleştiren ve öğreten bağımsız bir **Architecture Intelligence Platform** projesidir.

---

## Madde 1 — Salt-Okunur ve Müdahalesizlik İlkesi (Non-Intervention Principle)
1. AYAtlas, AykenOS repository'si üzerinde hiçbir zaman commit atmaz, branch oluşturmaz, PR açmaz, issue/yorum yazmaz veya dosya değiştiremez.
2. AYAtlas, AykenOS repository'si içindeki hiçbir kaynak kodu, shell script'i, Makefile'ı, Python betiğini veya QEMU simülasyonunu konak veya sanal ortamda **otomatik olarak çalıştıramaz**.
3. GitHub erişimi kesinlikle yalnız `GET` metotları ile sınırlıdır. Herhangi bir ağ paketinde mutation metodu (`POST`, `PUT`, `PATCH`, `DELETE`) kullanılması ağ ve yazılım düzeyinde engellenmiştir.

---

## Madde 2 — Bilgi Dönüşümü ve Determinizm İlkesi (Deterministic Pipeline)
1. AYAtlas'ın amacı repository verisini doğrudan ekrana basmak değil; ham veriyi (Raw Repo) indekslenmiş, anlamsal, mimari ve bilgi grafı katmanlarına dönüştürmektir.
2. 5-Aşamalı veri işleme hattı (Pipeline Stage 1..5) tamamen deterministiktir. Aynı snapshot verisi işlendiğinde platformlar arası aynı kanonik SHA-256 `payloadDigest` değerini üretmek zorundadır.
3. `generatedAt` gibi zaman damgaları kanonik payload hash hesabına katılamaz.

---

## Madde 3 — Ayrıştırılmış Üç Eksenli Durum Modeli (Multi-Axis Status Model)
AYAtlas üzerindeki her bileşen şu üç eksende birbirinden bağımsız olarak değerlendirilir:
- **Implementation Status**: `ABSENT` | `PLANNED` | `SKELETON` | `IMPLEMENTED` | `VALIDATED`
- **Authority Status**: `NO_AUTHORITY` | `PLANNING_ONLY` | `BOUNDED_AUTHORITY` | `ACTIVE_AUTHORITY` | `FROZEN`
- **Evidence Status**: `NO_EVIDENCE` | `OBSERVED_ARTIFACT` | `LOCAL_VALIDATION_PASS` | `REMOTE_WORKFLOW_PASS` | `EXACT_SUBJECT_BOUND` | `GOVERNANCE_REVIEWED` | `ACCEPTANCE_PENDING` | `ACCEPTED_EVIDENCE`

Kodun varlığı (`IMPLEMENTED`), o koda runtime yetkisi verildiği (`ACTIVE_AUTHORITY`) veya ürettiği kanıtın kabul edildiği (`ACCEPTED_EVIDENCE`) anlamına gelemez.

---

## Madde 4 — Gerçeklik ve Yorum Ayrımı (Assertion Classification)
AYAtlas üzerindeki her iddia açıkça sınıflandırılır:
- `REPOSITORY_FACT`: Kod veya dosyadan doğrudan çıkarılmış olgu.
- `CANONICAL_STATUS`: Güncel resmî faz pointer'ı veya yürürlükteki karar.
- `HISTORICAL_RECORD`: Geçmiş dönem kararı veya eski faz kaydı.
- `DERIVED_RELATION`: AYAtlas Knowledge Builder tarafından türetilmiş ilişki.
- `EDUCATIONAL_EXPLANATION`: Öğrenmeyi kolaylaştıran pedagojik açıklama.
- `INFERENCE`: Heuristik veya sezgisel çıkarım.

---

## Madde 5 — Zorunlu Kaynak Bağlantısı (Mandatory Provenance)
Knowledge Graph üzerindeki her bir düğüm ve ilişki en az bir `SourceReference` nesnesine (repository, branch, HEAD SHA, path, satır aralığı, commit veya PR numarası) açıkça bağlı olmak zorundadır. Kaynağı bulunmayan türetimler `UNVERIFIED` olarak işaretlenir.
