'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import { X } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const MapSelector = dynamic(() => import('./MapSelector'), { 
  ssr: false, 
  loading: () => <div className="h-48 w-full bg-muted/50 animate-pulse rounded-xl flex items-center justify-center border border-border/50 text-sm text-foreground/50 mt-2">Cargando mapa...</div> 
});

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function PurchaseModal({ isOpen, onClose, product }: PurchaseModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [recipient, setRecipient] = useState('');
  const [addressZone, setAddressZone] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  if (!isOpen) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedPrice = product.price.toLocaleString('es-BO');
    const total = (product.price * quantity).toLocaleString('es-BO');
    
    let whatsappText = `*NUEVA ORDEN DE COMPRA* 🌹\n\n`;
    whatsappText += `*Producto:* ${product.name}\n`;
    whatsappText += `*Precio Unitario:* Bs. ${formattedPrice}\n`;
    whatsappText += `*Cantidad:* ${quantity}\n`;
    whatsappText += `*Total Aproximado:* Bs. ${total}\n\n`;
    
    if (recipient) whatsappText += `*Para:* ${recipient}\n`;
    
    let fullAddress = '';
    if (addressZone || addressStreet || addressNumber) {
      fullAddress = [addressZone, addressStreet, addressNumber].filter(Boolean).join(', ');
      whatsappText += `*Dirección detallada:* ${fullAddress}\n`;
    }

    if (location) whatsappText += `*Ubicación GPS:* https://maps.google.com/?q=${location.lat},${location.lng}\n`;
    if (message) whatsappText += `*Mensaje en Tarjeta:* ${message}\n`;
    if (deliveryDate) whatsappText += `*Fecha/Hora de entrega:* ${deliveryDate}\n`;
    if (notes) whatsappText += `*Observaciones/Añadidos:* ${notes}\n`;

    const phoneNumber = "59178350552"; // Provided by user
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappText)}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm md:p-6 overflow-hidden animate-in fade-in duration-200">
      <div className="bg-background w-full h-full md:h-auto md:max-h-[95vh] md:max-w-5xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border-0 md:border border-border/50 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between p-4 px-6 border-b border-border/50 bg-background z-10">
          <h2 className="font-serif text-2xl font-bold">Completar Compra</h2>
          <button 
            type="button"
            onClick={onClose}
            className="p-2 bg-muted/50 hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-foreground/80" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto w-full">
          <div className="flex flex-col md:flex-row min-h-full">

            {/* Left Column: Product & Map */}
            <div className="w-full md:w-5/12 p-6 md:p-8 bg-muted/10 border-b md:border-b-0 md:border-r border-border/50 flex flex-col gap-8">
              
              <div className="flex flex-col items-center text-center">
                <div className="relative h-56 w-56 rounded-2xl overflow-hidden shadow-lg mb-6">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif font-bold text-3xl text-foreground">{product.name}</h3>
                <p className="text-foreground/70 mt-3 text-base leading-relaxed">{product.description}</p>
                <div className="mt-4 bg-primary/10 text-primary px-5 py-2 rounded-full font-bold text-lg inline-flex items-center gap-2">
                  <span>Bs. {product.price.toLocaleString('es-BO')} c/u</span>
                </div>
              </div>

              {/* Map (Desktop only in this column, mobile handled below) */}
              <div className="hidden md:block mt-auto w-full">
                <MapSelector onLocationSelect={(lat, lng) => setLocation({lat, lng})} />
              </div>

            </div>

            {/* Right Column: Form Fields */}
            <div className="w-full md:w-7/12 p-6 md:p-8">
              <form id="purchase-form" onSubmit={handleConfirm} className="space-y-6">
                
                <div className="pb-2 mb-4 border-b border-border/50">
                  <h3 className="text-xl font-bold text-foreground/90">Información del Pedido</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cantidad */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/80">Cantidad a Comprar</label>
                    <div className="flex items-center gap-4 bg-background border border-border p-2 rounded-xl">
                      <button 
                        type="button" 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors text-lg font-bold"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-2xl">{quantity}</span>
                      <button 
                        type="button" 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Delivery Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/80 flex items-center gap-1">
                      Fecha y Hora <span className="text-foreground/50 text-xs font-normal">(Opcional)</span>
                    </label>
                    <input 
                      type="text" 
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      placeholder="Ej. Mañana a las 10:00 AM"
                      className="w-full px-4 h-[58px] bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recipient */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/80 flex items-center gap-1">
                      ¿Para quién es? <span className="text-foreground/50 text-xs font-normal">(Opcional)</span>
                    </label>
                    <input 
                      type="text" 
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="Nombre del destinatario"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                    />
                  </div>

                  {/* Address Section */}
                  <div className="md:col-span-2 space-y-4 bg-muted/20 p-4 rounded-xl border border-border/50">
                    <h4 className="font-bold text-foreground/90 flex items-center gap-1">
                      Dirección de entrega <span className="text-foreground/50 text-xs font-normal">(Opcional)</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-foreground/70">Zona / Barrio</label>
                        <input 
                          type="text" 
                          value={addressZone}
                          onChange={(e) => setAddressZone(e.target.value)}
                          placeholder="Ej. Zona Norte, Cala Cala..."
                          className="w-full px-3 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-foreground/70">Calle o Avenida</label>
                        <input 
                          type="text" 
                          value={addressStreet}
                          onChange={(e) => setAddressStreet(e.target.value)}
                          placeholder="Ej. Av. Simón Bolívar"
                          className="w-full px-3 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-foreground/70">Número y detalles</label>
                        <input 
                          type="text" 
                          value={addressNumber}
                          onChange={(e) => setAddressNumber(e.target.value)}
                          placeholder="Ej. Casa #123, portón blanco..."
                          className="w-full px-3 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Map (Visible only on mobile) */}
                <div className="block md:hidden">
                  <MapSelector onLocationSelect={(lat, lng) => setLocation({lat, lng})} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/80 flex items-center gap-1">
                    Mensaje para la tarjeta <span className="text-foreground/50 text-xs font-normal">(Opcional)</span>
                  </label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe la dedicatoria aquí..."
                    rows={3}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/80 flex items-center gap-1">
                    Instrucciones / Observaciones <span className="text-foreground/50 text-xs font-normal">(Opcional)</span>
                  </label>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej. Cambiar color del papel, caja especial..."
                    rows={2}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none font-medium"
                  />
                </div>
                
              </form>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 p-4 px-6 border-t border-border/50 bg-background sm:flex sm:items-center sm:justify-between z-10 w-full shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <div className="mb-4 sm:mb-0 flex items-baseline gap-2">
            <span className="text-foreground/60 font-medium">Total estimado:</span>
            <span className="text-2xl font-black font-serif text-primary">Bs. {(product.price * quantity).toLocaleString('es-BO')}</span>
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-bold bg-muted hover:bg-muted/80 text-foreground transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              form="purchase-form"
              className="px-8 py-3 rounded-xl font-bold bg-foreground text-background hover:bg-primary hover:text-primary-foreground shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
            >
              Confirmar Reserva
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
