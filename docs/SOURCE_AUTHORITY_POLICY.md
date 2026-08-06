# AYAtlas Source Authority Policy (Otorite Politikası)

Bu doküman AYAtlas Authority Resolver bileşeninin AykenOS repository'sindeki belgeler, kodlar ve kayıtlar arasındaki anayasal otorite sıralamasını nasıl çözeceğini tanımlar.

---

## 1. Domain-Based Authority Resolution
AYAtlas tek bir global otorite sıralaması yerine sorgulanan alan bazlı (`AuthorityDomain`) çözümleme yapar:

1. **CURRENT_PHASE Domain**:
   - `docs/roadmap/CURRENT_PHASE` en yüksek otoritedir.
2. **ARCHITECTURE_INVARIANT Domain**:
   - `Foundational Oath`, `Architecture Freeze` ve anayasal sözleşmeler en yüksek otoritedir.
3. **PHASE_CLOSURE Domain**:
   - İlgili faza ait resmî kapanış kararları (`Closure Decision Records`) en yüksek otoritedir.
4. **EXACT_SUBJECT_STATUS Domain**:
   - Birebir SHA ile kilitlenmiş exact-subject karar kayıtları en yüksek otoritedir.
5. **IMPLEMENTATION_EXISTENCE Domain**:
   - Güncel HEAD commit'indeki dosya ağacı ve kodlar belirleyicidir.
6. **EVIDENCE_STATUS Domain**:
   - Anayasal karar kaynağı tarafından açıkça onaylanmış accepted-evidence belgeleri esastır. Workflow PASS sonuçları otomatik `ACCEPTED_EVIDENCE` oluşturamaz.

---

## 2. Otorite Sınıfları (Authority Classes)
Resolver her sorgu için şu sınıflardan birini üretir:
- `CANONICAL`: Yürürlükteki resmî otorite kararı.
- `EXACT_SUBJECT`: Belirli SHA ile sınırlı kabul edilmiş karar.
- `BOUNDED`: Kod mevcut ancak yetkisi sınırlandırılmış.
- `HISTORICAL`: Geçmiş döneme ait, güncel otoritesi bulunmayan kayıt.
- `NON_AUTHORITY`: Belge veya kod yüzeyi mevcut fakat yetki oluşturmuyor.
- `UNRESOLVED`: Çelişkili veya eksik otorite durumu.
