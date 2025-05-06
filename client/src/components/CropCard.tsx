import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Crop } from "@/lib/crops";

type CropCardProps = {
  crop: Crop;
  profit: number;
  likesCount: number;
  lovesCount: number;
};

export function CropCard({ crop, profit, likesCount, lovesCount }: CropCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      {/* Vue condensée (toujours visible) */}
      <div 
        className="flex gap-4 cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Image et badges */}
        <div className="flex-shrink-0 relative">
          <div className="w-16 h-16 border border-gray-200 rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
            <img 
              src={crop.imagePath} 
              alt={crop.name} 
              className="max-w-full max-h-full object-contain" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          {crop.isGoddessOffering && (
            <div 
              className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 bg-opacity-90 rounded-full flex items-center justify-center text-white shadow-md border border-purple-300"
              title={crop.goddessOfferingNote || "Requis pour le Temple de la Déesse"}
            >
              <div className="text-xs font-bold">💠</div>
            </div>
          )}
        </div>
        
        {/* Informations résumées */}
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h4 className="font-medium text-gray-900">{crop.name}</h4>
              <p className="text-sm text-gray-500">{crop.category}</p>
            </div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
              {crop.season}
            </Badge>
          </div>
          
          {/* Informations essentielles */}
          <div className="flex justify-between items-center mt-1">
            <div className="flex gap-2 text-xs text-gray-600">
              <div className="font-medium">Jours: {crop.growthTime}</div>
              <div>|</div>
              <div className="font-medium">Prix: {crop.seedPrice}</div>
              <div>|</div>
              <div className="font-medium text-green-600">Profit: +{profit}</div>
            </div>
            <div className="text-blue-500 text-xs">
              {isExpanded ? "Masquer ▲" : "Détails ▼"}
            </div>
          </div>
          
          {/* Badges résumés des préférences - uniquement ceux qui adorent */}
          <div className="flex flex-wrap gap-2 mt-1">
            {lovesCount > 0 && (
              <div className="bg-pink-100 text-pink-800 text-xs px-2 py-0.5 rounded-full">
                {lovesCount}❤️
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Détails (visibles seulement quand expandé) */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">{crop.description}</p>
          
          {/* Caractéristiques détaillées */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
            <div>
              <span className="font-medium">Graine:</span> {crop.seedName}
            </div>
            <div>
              <span className="font-medium">Source:</span> {crop.seedSource}
            </div>
            <div>
              <span className="font-medium">Rang ville:</span> {crop.townRank}
            </div>
{/* Suppression de l'affichage de la taille */}
            {crop.sellPrice && (
              <div>
                <span className="font-medium">Vente:</span> {crop.sellPrice} pièces
              </div>
            )}
            {crop.harvestYield && (
              <div>
                <span className="font-medium">Récolte:</span> {crop.harvestYield} par plante
              </div>
            )}
            {crop.regrowth && (
              <div>
                <span className="font-medium">Repousse:</span> {crop.regrowth} jours
              </div>
            )}
            {crop.energy && (
              <div>
                <span className="font-medium">Énergie:</span> +{crop.energy}
              </div>
            )}
            {crop.combinePct && (
              <div>
                <span className="font-medium">Combinaison:</span> {crop.combinePct}%
              </div>
            )}
          </div>
          
          {/* Temple de la Déesse */}
          {crop.isGoddessOffering && (
            <div className="mt-3">
              <div className="bg-purple-50 border border-purple-200 rounded-md p-2 text-sm text-purple-800 flex items-center gap-2">
                <div className="text-purple-600">💠</div>
                <div>{crop.goddessOfferingNote || "Requis pour le Temple de la Déesse"}</div>
              </div>
            </div>
          )}
          
          {/* Préférences des villageois */}
          {crop.preferences && crop.preferences.length > 0 && (
            <div className="mt-3">
              <h5 className="text-xs font-medium text-gray-700 mb-2">Préférences des villageois:</h5>
              
              {/* Résumé des préférences - uniquement ceux qui adorent */}
              <div className="mb-2 flex flex-wrap gap-2">
                {lovesCount > 0 && (
                  <div className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">
                    {lovesCount} villageois {lovesCount > 1 ? "adorent" : "adore"} ❤️
                  </div>
                )}
              </div>
              
              {/* Détail des préférences (afficher/masquer) */}
              <details className="text-sm">
                <summary className="cursor-pointer text-xs text-blue-600 hover:text-blue-800 mb-2">
                  Voir les villageois qui adorent ❤️
                </summary>
                <div className="flex flex-wrap gap-2 mt-2 max-h-32 overflow-y-auto">
                  {crop.preferences
                    .filter(pref => pref.preference === "adore")
                    .map((pref, index) => (
                      <div 
                        key={index} 
                        className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-800"
                      >
                        {pref.name} ❤️
                      </div>
                    ))}
                </div>
              </details>
            </div>
          )}
          
          {/* Rentabilité détaillée */}
          {crop.sellPrice && (
            <div className="mt-3 flex justify-between items-center pt-2 border-t border-gray-100">
              <div className="text-sm">
                <span className="font-medium text-green-600">Profit par jour:</span> 
                <span className="ml-1 text-green-700">+{profit} pièces/jour</span>
              </div>
              <div className="text-xs text-gray-500">
                ({crop.sellPrice} vente - {crop.seedPrice} achat)
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}