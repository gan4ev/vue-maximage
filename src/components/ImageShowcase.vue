<template>
  <div class="relative w-full h-[400px] mb-20 flex justify-center items-center gap-5">
    <div class="showcase-image float-1">
      <img 
        src="https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&q=80&w=1920"
        alt="Flamingos in Lake" 
        class="w-[320px] h-[400px] object-cover rounded-2xl shadow-2xl"
      />
      <div class="image-label">Nature</div>
    </div>
    <div class="showcase-image float-2">
      <img 
        src="https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&q=80&w=1920"
        alt="Rainbow Bird" 
        class="w-[320px] h-[400px] object-cover rounded-2xl shadow-2xl"
      />
      <div class="image-label">Wildlife</div>
    </div>
    <div class="showcase-image float-3">
      <img 
        src="https://images.unsplash.com/photo-1559535332-db9971090158?auto=format&fit=crop&q=80&w=1920"
        alt="Beautiful Butterfly" 
        class="w-[320px] h-[400px] object-cover rounded-2xl shadow-2xl"
      />
      <div class="image-label">Macro</div>
    </div>
  </div>
</template>

<style scoped>
.showcase-image {
  position: relative;
  overflow: hidden;
  perspective: 1000px;
}

.showcase-image img {
  transition: transform 0.5s ease;
}

.showcase-image:hover img {
  transform: scale(1.1);
}

.float-1 {
  transform: translateX(-40%) translateY(-10%) rotate(-5deg);
  z-index: 3;
  animation: float1 6s ease-in-out infinite;
}

.float-2 {
  transform: translateX(0%) translateY(0%);
  z-index: 2;
  animation: float2 7s ease-in-out infinite;
}

.float-3 {
  transform: translateX(40%) translateY(10%) rotate(5deg);
  z-index: 1;
  animation: float3 8s ease-in-out infinite;
}

@keyframes float1 {
  0%, 100% { transform: translateX(-40%) translateY(-10%) rotate(-5deg); }
  50% { transform: translateX(-40%) translateY(-15%) rotate(-3deg); }
}

@keyframes float2 {
  0%, 100% { transform: translateX(0%) translateY(0%); }
  50% { transform: translateX(0%) translateY(-5%); }
}

@keyframes float3 {
  0%, 100% { transform: translateX(40%) translateY(10%) rotate(5deg); }
  50% { transform: translateX(40%) translateY(5%) rotate(3deg); }
}

.image-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: white;
  font-weight: 500;
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s ease;
}

.showcase-image:hover .image-label {
  opacity: 1;
  transform: translateY(0);
}
</style>
