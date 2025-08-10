# Empire Web Game

Empire Web Game, popüler web tabanlı oyunun, masaüstü için özel olarak tasarlanmış bir Electron uygulamasıdır. Bu uygulama, web oyununu platforma özgü özellikler (pencere yönetimi, klavye kısayolları vb.) ile birleştirerek daha akıcı ve yerel bir deneyim sunar.

### Özellikler

  * **Pencere Sürükleme:** Meta tuşuna (`Cmd` veya `Ctrl`) basılı tutarak pencereyi ekranın herhangi bir yerine kolayca taşıyın.
  * **Tam Ekran Modu:** Tek bir tuşla veya menüden tam ekran moduna geçin.
  * **Geliştirici Konsolu:** Uygulamayı geliştirme ve hata ayıklama için geliştirici konsoluna kolayca erişim sağlayın.
  * **Kolay Kurulum:** Windows, macOS ve Linux için hazır paketler halinde sunulur.

### Kurulum

Uygulamayı yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

#### Ön Koşullar

  * [Node.js](https://nodejs.org/en/)
  * [npm](https://www.npmjs.com/)

#### Adımlar

1.  Proje deposunu klonlayın:

    ```bash
    git clone https://github.com/nFluDev/ggempire.git
    cd [proje-adi]
    ```

2.  Gerekli bağımlılıkları yükleyin:

    ```bash
    npm install
    ```

### Kullanım

Geliştirme modunda uygulamayı başlatmak için:

```bash
npm start
```

### Build (Uygulama Oluşturma)

`electron-builder` kullanarak uygulamanın dağıtılabilir versiyonlarını oluşturabilirsiniz. Tüm platformlar için paket oluşturmak için aşağıdaki komutu kullanın:

```bash
npm run build
```

Bu komut, `dist` klasörünün içine Windows (`.exe` veya `.msi`), macOS (`.dmg`) ve Linux (`.AppImage`, `.deb`, `.rpm`) paketlerini oluşturacaktır.

#### Platforma Özel Build Komutları

  * **Windows (64-bit):** `electron-builder --win --x64`
  * **macOS (Universal):** `electron-builder --mac --x64 --arm64`
  * **Linux (AppImage):** `electron-builder --linux AppImage`

### Katkıda Bulunma

Geri bildirimleriniz ve katkılarınız her zaman bekleriz. Lütfen bir sorun bulduğunuzda [Issues](https://www.google.com/search?q=https://github.com/nFluDev/ggempire/issues) sayfasında yeni bir başlık açın veya bir özellik önermek için [Pull Request](https://www.google.com/search?q=https://github.com/nFluDev/ggempire/pulls) gönderin.

### Lisans

Bilgi için `LICENSE` dosyasına bakınız.