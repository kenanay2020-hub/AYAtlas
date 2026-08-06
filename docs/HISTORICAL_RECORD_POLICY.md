# AYAtlas Historical Record Policy (Tarihsel Kayıt Politikası)

AYAtlas, AykenOS'un geçmişindeki mimari kararları, eski faz belgelerini ve güncellenmiş tanımları silmez, değiştirmez veya "yanlış" olarak nitelendirmez.

---

## 1. Geçmiş Kayıtların Korunması
- Eski faz belgeleri (örneğin `CURRENT_PHASE=16` veya `Phase-19` dönemi kayıtları) tarihsel gelişim takibinin ve mimari evrimin anlaşılması için aynen korunur.
- Bir belgenin geçmiş döneme ait olması onun sisteme katılmayacağı anlamına gelmez; `HISTORICAL_RECORD` olarak sınıflandırılarak saklanır.

---

## 2. Güncel Otorite ile İlişki
- Güncel faz durumu hesaplanırken `HISTORICAL_RECORD` olarak etiketlenmiş belgeler güncel otorite hesabına dahil edilmez.
- Arayüzde tarihsel belgeler görsel olarak belirgin bir etiketle (`HISTORICAL`) gösterilir ve hangi tarihte/fazda geçerli olduğu açıkça belirtilir.
