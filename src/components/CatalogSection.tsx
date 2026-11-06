"use client";

import { useMemo, useState } from "react";
import { publishedBeautyPackages, type CatalogPackage, type CatalogCategory } from "@/data/catalog";

type Category = "all" | CatalogCategory;
type Order = "catalog" | "price-asc" | "price-desc";
const PAGE_SIZE = 6;
const categoryOptions: { value: Category; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "facial", label: "Faciales" },
  { value: "corporal", label: "Corporales" },
];
const normalized = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const price = (amount:number) => "Bs " + new Intl.NumberFormat("es-BO",{maximumFractionDigits:0}).format(amount);
function sessionText(item:CatalogPackage) {
  if(item.sessions.mode === "fixed" && item.sessions.total !== null)
    return item.sessions.total === 1 ? "1 sesión" : item.sessions.total + " sesiones";
  return item.sessions.mode === "per_procedure" ? "Sesiones por técnica" : "Sesiones: consultar";
}

export function CatalogSection({onConsult}:{onConsult:(packageName:string)=>void}) {
  const [category,setCategory] = useState<Category>("all");
  const [search,setSearch] = useState("");
  const [sort,setSort] = useState<Order>("catalog");
  const [limit,setLimit] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = normalized(search.trim());
    const result = publishedBeautyPackages.filter(item => (
      (category === "all" || item.category === category) &&
      (!q || normalized([item.name,...item.includedProcedures].join(" ")).includes(q))
    ));
    if(sort !== "catalog") {
      result.sort((a,b) => sort === "price-asc" ? a.price.amount - b.price.amount : b.price.amount - a.price.amount);
    }
    return result;
  },[category,search,sort]);
  const shown = filtered.slice(0,limit);
  const remaining = filtered.length - shown.length;
  const numberIn = (value:Category) => value === "all"
    ? publishedBeautyPackages.length
    : publishedBeautyPackages.filter(item=>item.category===value).length;

  return (
    <section className="services catalog-section" id="tratamientos" aria-labelledby="services-title">
      <div className="wrap">
        <div className="section-head catalog-section__heading" data-reveal>
          <div className="eyebrow">Catálogo Equilibria Beauty</div>
          <h2 className="section-title" id="services-title">El arte de <em>cuidarte.</em></h2>
          <p className="section-desc">Descubre nuestros paquetes faciales y corporales, conoce qué incluye cada uno y consulta cómo comenzar.</p>
          <div className="catalog-overview">
            <span><strong>12</strong> faciales</span><span className="catalog-overview__divider" aria-hidden="true" />
            <span><strong>11</strong> corporales</span><span className="catalog-overview__divider" aria-hidden="true" />
            <span><strong>23</strong> paquetes</span>
          </div>
        </div>

        <div className="catalog-controls">
          <div className="catalog-categories" role="group" aria-label="Filtrar paquetes por categoría">
            {categoryOptions.map(option => (
              <button type="button" key={option.value} className="catalog-tab" aria-pressed={category===option.value}
                onClick={() => {setCategory(option.value);setLimit(PAGE_SIZE);}}>
                {option.label} <span>{numberIn(option.value)}</span>
              </button>
            ))}
          </div>
          <div className="catalog-tools">
            <label className="catalog-search">
              <span className="catalog-sr-only">Buscar paquete o procedimiento</span>
              <span aria-hidden="true" className="catalog-search__icon">⌕</span>
              <input type="search" value={search} placeholder="Buscar tratamiento..."
                onChange={e=>{setSearch(e.target.value);setLimit(PAGE_SIZE);}} />
            </label>
            <label className="catalog-sort">
              <span className="catalog-sr-only">Ordenar por precio</span>
              <select value={sort} onChange={e=>{setSort(e.target.value as Order);setLimit(PAGE_SIZE);}}>
                <option value="catalog">Orden del catálogo</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
              </select>
            </label>
          </div>
        </div>
        <p className="catalog-result-count" aria-live="polite" aria-atomic="true">
          {filtered.length} {filtered.length===1?"paquete encontrado":"paquetes encontrados"}
        </p>
        {shown.length > 0 ? (
          <div className="catalog-grid">
            {shown.map((item,index)=>(
              <article key={item.id} className="catalog-card" aria-labelledby={"catalog-title-"+item.id}>
                <div className="catalog-card__top">
                  <span className="catalog-card__number">{String(index+1).padStart(2,"0")}</span>
                  <span className={"catalog-card__category catalog-card__category--"+item.category}>
                    {item.category==="facial"?"Facial":"Corporal"}
                  </span>
                </div>
                <div className="catalog-card__heading">
                  <h3 id={"catalog-title-"+item.id}>{item.name}</h3>
                  <p>{sessionText(item)}</p>
                </div>
                <div className="catalog-card__preview">
                  <span className="catalog-card__eyebrow">INCLUYE</span>
                  <ul>{item.includedProcedures.slice(0,2).map((part,i)=><li key={i}>{part}</li>)}</ul>
                </div>
                <details className="catalog-card__details">
                  <summary>Ver todos los procedimientos <span aria-hidden="true">+</span></summary>
                  <div className="catalog-card__expanded">
                    <ul>{item.includedProcedures.map((part,i)=><li key={i}>{part}</li>)}</ul>
                    {item.sessionBreakdown && (
                      <div className="catalog-card__breakdown">
                        <strong>Distribución por técnica</strong>
                        <ul>{item.sessionBreakdown.map((entry,i)=>(
                          <li key={i}>{entry.procedure}: {entry.quantity} {entry.unit === "sesión" ?
                            (entry.quantity===1?"sesión":"sesiones") : "aplicación indicada"}</li>
                        ))}</ul>
                        <p>Las cantidades por técnica no equivalen necesariamente al número de visitas.</p>
                      </div>
                    )}
                    {item.bonus && item.bonus.length>0 &&
                      <p className="catalog-card__bonus"><strong>Adicional:</strong> {item.bonus.join("; ")}</p>}
                    <p className="catalog-card__source">
                      Catálogo {item.category==="facial"?"facial":"corporal"} · página {item.source.page}
                    </p>
                  </div>
                </details>
                <div className="catalog-card__bottom">
                  <div>
                    <span className="catalog-card__eyebrow">PRECIO DE CATÁLOGO</span>
                    <strong>{price(item.price.amount)}</strong>
                  </div>
                  <button type="button" onClick={()=>onConsult(item.name)}>
                    Consultar paquete <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="catalog-empty">
            <h3>No encontramos paquetes</h3><p>Prueba con otra búsqueda o vuelve al catálogo completo.</p>
            <button type="button" onClick={()=>{setSearch("");setCategory("all");setSort("catalog");setLimit(PAGE_SIZE);}}>Ver todos los paquetes</button>
          </div>
        )}
        {remaining>0 && (
          <div className="catalog-more">
            <p>Mostrando {shown.length} de {filtered.length} paquetes</p>
            <button type="button" onClick={()=>setLimit(n=>n+PAGE_SIZE)}>
              Mostrar {Math.min(PAGE_SIZE,remaining)} más <span aria-hidden="true">↓</span>
            </button>
          </div>
        )}
        <p className="catalog-disclaimer">
          Precios y procedimientos basados en los catálogos facilitados. Confirma su vigencia,
          disponibilidad y número de citas con el equipo antes de reservar.
        </p>
      </div>
    </section>
  );
}
