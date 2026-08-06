# AYAtlas Terminology & Controlled Vocabulary

Bu doküman AYAtlas platformu genelinde kullanılan terimleri ve standart tanımları içerir.

---

## 1. Temel Terimler
- **AykenOS**: İncelenen hedef işletim sistemi projesi (`kenanay/AykenOS`).
- **AYAtlas**: AykenOS'un salt-okunur Architecture Intelligence Platform platformu.
- **Ring0 Mechanism**: Kernel içinde kalan, policy içermeyen minimal çekirdek mekanizma katmanı.
- **Ring3 Policy**: Kullanıcı alanında çalışan policy, AI runtime, DSL ve yönetim katmanları.
- **ABDF**: Ayken Binary Data Format — Tipli, deterministik ikili veri formatı.
- **BCIB**: Binary Code / Instruction Representation — Deterministik komut taşıyıcı altyapısı.
- **Syscall ABI**: Ring3 ile Ring0 arasındaki dondurulmuş anayasal arayüz sınırı (`FROZEN`).
- **Exact-Subject Binding**: Bir kararın veya kanıtın belirli bir commit SHA'ya sarsılmaz biçimde kilitlenmesi.
- **Accepted Evidence**: Anayasal süreçlerle resmen kabul edilmiş ve gelecekte yetki kararına temel oluşturabilecek onaylı kanıt.
- **Validator Output**: Doğrulama araçlarının ürettiği ham veya işlenmiş çıktı. (Tek başına `Accepted Evidence` değildir).
