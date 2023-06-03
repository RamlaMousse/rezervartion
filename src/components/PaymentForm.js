import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import jsonData from '../data.json';
import './PaymentForm.css';

const PaymentForm = ({ onPaymentSubmit }) => {
  const [name, setName] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [tcKimlik, setTcKimlik] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    setPrice(jsonData.price);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentInfo = {
      name,
      creditCard,
      expiryDate,
      tcKimlik,
      phone,
      email
    };

    const pdfDoc = await PDFDocument.create();


    const page = pdfDoc.addPage();


    const font = await pdfDoc.embedFont(StandardFonts.Helvetica, 'Unicode');
    page.setFont(font);
    page.setFontSize(12);


    const textContent = `
      Ad Soyad: ${paymentInfo.name}
      Kredi Karti No: ${paymentInfo.creditCard}
      Son Kullanma Tarihi: ${paymentInfo.expiryDate}
      T.C. Kimlik No: ${paymentInfo.tcKimlik}
      Telefon No: ${paymentInfo.phone}
      E-posta Adresi: ${paymentInfo.email}
      Fiyat: ${price}
    `;

    page.drawText(textContent, {
      x: 50,
      y: page.getHeight() - 50,
      maxWidth: 500,
      lineHeight: 20,
    });

    const pdfBytes = await pdfDoc.save();

    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    saveAs(pdfBlob, 'payment_info.pdf');

    if (typeof onPaymentSubmit === 'function') {
      onPaymentSubmit(paymentInfo);
    }
  };

  return (
    <div className="PaymentForm">
      <h2>Ödeme Bilgileri</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>T.C. Kimlik Numarası</legend>
          <label htmlFor="tcKimlik">T.C. Kimlik No:</label>
          <input
            type="text"
            id="tcKimlik"
            value={tcKimlik}
            maxLength={11}
            onChange={(e) => setTcKimlik(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>İletişim Bilgileri</legend>
          <label htmlFor="name">Ad Soyad:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="phone">Telefon No:</label>
          <input
            type="tel"
            id="phone"
            pattern="[0-9]{10}"
            placeholder="Cep telefonu numarası"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label htmlFor="email">E-posta Adresi:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>Kredi Kartı Bilgileri</legend>
          <label htmlFor="creditCard">Kredi Kartı No:</label>
          <input
            type="text"
            id="creditCard"
            value={creditCard}
            maxLength={16}
            onChange={(e) => setCreditCard(e.target.value)}
          />

          <label htmlFor="expiryDate">Son Kullanma Tarihi (GG/YY):</label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            maxLength={5}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </fieldset>

        <button type="submit">Ödeme Yap</button>
      </form>
    </div>
  );
};

export default PaymentForm;
