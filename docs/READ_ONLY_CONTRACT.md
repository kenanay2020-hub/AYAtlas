# AYAtlas Read-Only Contract (Salt-Okunur Sözleşmesi)

Bu doküman AYAtlas'ın AykenOS (`kenanay/AykenOS`) repository'si ile etkileşimindeki salt-okunur güvenlik sınırlarını ve yazılım sözleşmelerini tanımlar.

---

## 1. Ağ Seviyesinde Kısıtlamalar
- GitHub API İstemcisi (`packages/github-reader`) yalnızca HTTP `GET` istekleri yapacak şekilde kodlanmıştır.
- `POST`, `PUT`, `PATCH`, `DELETE` metotları istemci arayüzünde bulunmaz.
- Test ortamlarında herhangi bir non-GET HTTP isteği yapıldığında test paketi `MutationAttemptError` fırlatarak çalışmayı derhal durdurur.

---

## 2. Statik Çalışma Garantisi (Static-Only Parser)
- `packages/repository-parser` ve `packages/knowledge-builder` paketlerinde Node.js process çalıştırma modülleri (`child_process`, `execa`, `shelljs`, `zx`, `node-pty`) kesinlikle import edilemez.
- AYAtlas, AykenOS repo'sundaki dosyaları yalnız metin, YAML, TOML, Markdown ve statik AST ayrıştırıcısı olarak okur.
- Hiçbir şart altında `cargo`, `make`, `qemu`, `python` veya shell script çalıştırılamaz.

---

## 3. İzin Verilen Okuma Yüzeyleri
AYAtlas yalnız şu verileri okuabilir:
- Dosya ve dizin ağacı (`getTree`)
- Dosya içerikleri (`getFile`)
- Commit geçmişi (`getCommits`)
- PR geçmişi (`getPullRequests`)
- Workflow tanımları ve çalışma sonuçları (`getWorkflowRuns`)
- Repository metadata (`getRepository`)
