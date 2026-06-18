/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';

const CSV_DATA = `ID,Slot,Limit_ship_type,Value_ID_1,Value_Type_1,Value_1,Value_ID_2,Value_Type_2,Value_2,Value_ID_3,Value_Type_3,Value_3,Value_ID_4,Value_Type_4,Value_4,Value_ID_5,Value_Type_5,Value_5
,,,,,,,,,,,,,,,,,
1003,1,,Torpedo Tube Reload Time+,1,-0.05,Torpedo Speed-,1,-0.03,,,,,,,,,
1006,1|2,,Main Battery Reload Time+,1,-0.05,Main Battery Traverse Speed-,1,-0.1,,,,,,,,,
1009,1,,Secondary Battery Firing Range+,1,0.06,Secondary Battery (Auto) Firing Range+,1,0.06,Maximum Secondary Battery Shell Dispersion-,1,0.05,Maximum Secondary Battery (Auto) Shell Dispersion-,1,0.05,,,
1012,2,4,Fighter Speed+,1,0.11,Fighter Attack Efficiency+,1,0.22,,,,,,,,,
1015,1,,Airstrike Response Speed+,1,-0.09,Chance of Setting Fire-,1,-0.05,,,,,,,,,
1018,2,,Main Battery Traverse Speed+,1,0.14,Main Battery Survivability-,1,-0.05,,,,,,,,,
1021,1,,Torpedo Range+,1,0.06,Torpedo Chance of Starting Flooding-,1,-0.07,,,,,,,,,
1024,1,,Dive Bomber Speed+,1,0.09,Torpedo Bomber Speed+,1,0.09,Dive Bomber HP-,1,-0.05,Torpedo Bomber HP-,1,-0.05,,,
1027,1,4,Tactical Dive Bomber Attack Dispersion+,1,-0.07,Aircraft Torpedo Speed+,1,0.07,Tactical Dive Bomber Preparation Time-,1,0.07,Tactical Torpedo Bomber Preparation Time-,1,0.07,,,
1030,1|2,,Secondary Battery Reload Time+,1,-0.12,Secondary Battery (Auto) Reload Time+,1,-0.12,Secondary Battery Firing Range-,1,-0.05,Secondary Battery (Auto) Firing Range-,1,-0.05,,,
1033,1|2,,Maximum Main Battery Shell Dispersion+,1,-0.09,Maximum Secondary Battery Shell Dispersion+,1,-0.09,Maximum Secondary Battery (Auto) Shell Dispersion+,1,-0.09,Surface Detection-,1,0.02,,,
1036,2|3,,Large Caliber AA Damage+,1,0.24,Small Caliber AA Damage+,1,0.24,Maximum Main Battery Shell Dispersion-,1,0.05,,,,,,
1039,2|3,,Large Caliber AA Range+,1,0.2,Small Caliber AA Range+,1,0.2,Main Battery Traverse Speed-,1,-0.05,,,,,,
1042,1|2,,Dive Bomber Capacity+,1,0.14,Dive Bomber Preparation Time-,1,0.05,,,,,,,,,
1045,1|2,,Torpedo Bomber Capacity+,1,0.14,Torpedo Bomber Preparation Time-,1,0.05,,,,,,,,,
1048,1,,Dive Bomber Preparation Time+,1,-0.12,Torpedo Bomber Preparation Time+,1,-0.12,Fighter Preparation Time-,1,0.15,,,,,,
1051,1|2,,Airstrke Reload Time+,1,-0.07,Surface Detection-,1,0.03,,,,,,,,,
1054,3,,Surface Detection+,1,-0.07,Ship Hit Points-,1,-0.05,,,,,,,,,
1057,2,,Ship Hit Points+,1,0.06,Max Traverse Speed-,1,-0.05,,,,,,,,,
1060,2,,Damage Reduction+,0,0.04,Torpedo Damage Reduction-,0,-0.03,,,,,,,,,
1063,2|3,,Max Speed+,1,0.06,Acceleration+,1,0.06,Deceleration+,1,0.06,Power System Survivability-,1,-0.15,,,
1066,2|3,,Max Traverse Speed+,1,0.06,Traverse Acceleration+,1,0.1,Traverse Deceleration+,1,0.1,Maximum Main Battery Shell Dispersion-,1,0.05,,,
1069,3,,Fire and Flooding Resistance+,0,0.04,Fire and Flooding Time-,1,0.05,,,,,,,,,
1072,2|3,,Deck Armor+,0,8,Risk of Fire on Deck+,0,-0.06,Max Speed-,1,-0.07,,,,,,
1075,2|3,,Bow Armor+,0,8,Stern Armor+,0,8,Acceleration-,1,-0.07,Deceleration-,1,-0.07,,,
1078,4,1,Surface Detection+,1,-0.05,Torpedo Tube Traverse Speed-,1,0.05,,,,,,,,,
1081,4,1,Torpedo Tube Traverse Speed+,1,0.08,Torpedo Speed+,1,0.08,Main Battery Firing Range-,1,-0.03,,,,,,
1084,4,1,Acceleration+,1,0.12,Deceleration+,1,0.12,Max Turning Speed-,1,-0.03,,,,,,
1087,4,2,Main Battery Firing Range+,1,0.04,Acceleration+,1,-0.04,Deceleration-,1,-0.04,,,,,,
1090,4,2,Torpedo Tube Reload Time+,1,-0.05,Torpedo Tube Traverse Speed+,1,-0.05,,,,,,,,,
1093,4,2,Main Battery Shell Velocity+,1,0.06,Main Battery Survivability+,1,-0.1,,,,,,,,,
1096,4,3,Minimum Main Battery Shell Dispersion+,1,-0.04,Maximum Main Battery Shell Dispersion+,1,-0.04,Main Battery Survivability-,1,-0.1,,,,,,
1099,4,3,Main Battery Citadel Damage Rate+,1,0.07,Maximum Main Battery Shell Dispersion-,1,0.05,,,,,,,,,
1102,4,3,Secondary Battery (Auto) Reload Time+,1,-0.07,Secondary Battery (Auto) Firing Range+,1,0.07,Maximum Secondary Battery (Auto) Shell Dispersion+,1,-0.07,Secondary Battery (Auto) Survivability-,1,-0.1,,,
1105,4,4,Fighter Attack Efficiency+,1,0.14,Fighter Capacity+,1,0.14,Main Battery Firing Range-,1,-0.04,,,,,,
1108,4,4,Fighter HP+,1,0.12,Fighter Speed+,1,0.16,Max Speed-,1,-0.02,,,,,,
1111,4,4,Fighters Detection Range+,1,0.19,Fighter guard radius+,1,0.11,Large Caliber AA Range-,1,-0.04,,,,,,
1114,4,,Main Battery Survivability+,1,0.19,Secondary Battery Survivability+,1,0.19,Secondary Battery (Auto) Survivability+,1,0.19,Torpedo Tube Survivability+,1,0.19,Ship Hit Points-,1,-0.02
1117,4,,Main Battery Traverse Speed+,1,0.16,Secondary Battery Traverse Speed+,1,0.16,Secondary Battery (Auto) Traverse Speed+,1,0.16,Torpedo Tube Traverse Speed+,1,0.16,Max Speed-,1,-0.02
1120,5|6,,Traverse Acceleration+,1,0.1,Traverse Deceleration+,1,0.11,Steering Gear Survivability-,1,-0.07,,,,,,
1123,5|6,,Acceleration+,1,0.11,Deceleration+,1,0.11,Max Turning Speed-,1,-0.04,,,,,,
1126,5|6,,Large Caliber AA Damage+,1,0.08,Large Caliber AA Range+,1,0.14,Fire and Flooding Time-,1,0.1,,,,,,
1129,5|6,,Small Caliber AA Damage+,1,0.08,Small Caliber AA Range+,1,0.14,Power System Survivability-,1,-0.1,,,,,,
1132,5,,Torpedo Damage Reduction+,0,0.05,Citadel Protection+,0,0.05,Acceleration-,1,-0.04,Deceleration-,1,-0.04,,,
1135,5,,Fire and Flooding Resistance+,0,0.07,Risk of Fire on Deck+,1,-0.14,Risk of Superstructure Fire+,1,-0.14,Torpedo Damage Reduction-,0,-0.03,,,
1138,5,,Torpedo Damage Reduction+,1,0.19,Fire and Flooding Resistance+,1,0.14,Traverse Acceleration-,1,-0.04,Traverse Deceleration-,1,-0.04,,,
1141,6,,Damage Reduction+,0,0.05,Power System Survivability+,1,0.14,Fire and Flooding Resistance-,0,-0.04,,,,,,
1144,6,,Steering Gear Repair Time+,1,-0.4,Power System Repair Time+,1,-0.4,Main Battery Repair Time+,1,-0.4,Torpedo Tube Repair Time+,1,-0.4,Max Traverse Speed-,1,-0.03
1147,6,,Main Battery Survivability+,1,0.24,Secondary Battery Survivability+,1,0.24,Secondary Battery (Auto) Survivability+,1,0.24,Torpedo Tube Survivability+,1,0.24,Fire and Flooding Time-,1,0.05
1150,4,2,Surface Detection+,1,-0.05,Power System Survivability-,1,-0.1,,,,,,,,,`;

type ShipType = 1 | 2 | 3 | 4;

interface Attr {
  rawName: string;
  baseName: string;
  isBuff: boolean;
  type: number;
  value: number;
}

interface Equipment {
  id: number;
  slots: number[];
  shipLimits: number[];
  attrs: Attr[];
}

const shipNames: Record<ShipType, string> = {
  1: 'Destroyer (DD)',
  2: 'Cruiser (CA)',
  3: 'Battleship (BB)',
  4: 'Carrier (CV)'
};

export default function App() {
  const { equipments, buffSignMap } = useMemo(() => {
    const lines = CSV_DATA.trim().split('\n');
    const parsedEqs: Equipment[] = [];
    const bMap: Record<string, number> = {};

    for (let i = 2; i < lines.length; i++) {
      const row = lines[i].split(',');
      if (!row[0]) continue;
      const id = parseInt(row[0]);
      const slots = row[1].split('|').map(Number);
      const shipLimits = row[2] ? row[2].split('|').map(Number) : [1, 2, 3, 4];
      
      const attrs: Attr[] = [];
      for (let j = 3; j < row.length; j += 3) {
        if (!row[j]) continue;
        const rawName = row[j];
        const type = parseInt(row[j+1]);
        const value = parseFloat(row[j+2]);
        
        const isBuff = rawName.endsWith('+');
        const baseName = rawName.replace(/[+-]$/, '');
        
        attrs.push({ rawName, baseName, isBuff, type, value });
        
        if (value !== 0) {
          bMap[baseName] = isBuff ? Math.sign(value) : -Math.sign(value);
        }
      }
      parsedEqs.push({ id, slots, shipLimits, attrs });
    }
    return { equipments: parsedEqs, buffSignMap: bMap };
  }, []);

  const [selectedShip, setSelectedShip] = useState<ShipType | null>(null);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [equipped, setEquipped] = useState<Record<number, number>>({});
  const [viewMode, setViewMode] = useState<'configurator' | 'equipList'>('configurator');
  
  const [listSlotFilter, setListSlotFilter] = useState<number | null>(null);
  const [listShipFilter, setListShipFilter] = useState<ShipType | null>(null);

  const filteredEquipmentsList = useMemo(() => {
    return equipments.filter(eq => {
      if (listSlotFilter !== null && !eq.slots.includes(listSlotFilter)) return false;
      if (listShipFilter !== null && !eq.shipLimits.includes(listShipFilter)) return false;
      return true;
    });
  }, [equipments, listSlotFilter, listShipFilter]);

  const handleShipSelect = (ship: ShipType) => {
    setSelectedShip(ship);
    setEquipped({});
    setActiveSlot(null);
  };

  const handleSlotSelect = (slot: number) => {
    if (selectedShip === null) {
      alert("Please select a ship type first!");
      return;
    }
    setActiveSlot(slot === activeSlot ? null : slot);
  };

  const handleEquip = (eqId: number) => {
    if (activeSlot === null) return;
    setEquipped(prev => ({ ...prev, [activeSlot]: eqId }));
    setActiveSlot(null);
  };

  const handleUnequip = (slot: number) => {
    setEquipped(prev => {
      const next = { ...prev };
      delete next[slot];
      return next;
    });
  };

  const formatValue = (value: number, type: number) => {
    if (type === 1) {
      const num = parseFloat((value * 100).toFixed(2));
      return num > 0 ? `+${num}%` : `${num}%`;
    }
    const num = parseFloat(value.toFixed(2));
    return num > 0 ? `+${num}` : `${num}`;
  };

  const availableEquipments = useMemo(() => {
    if (activeSlot === null || selectedShip === null) return [];
    
    const equippedIds = Object.entries(equipped)
      .filter(([slot]) => Number(slot) !== activeSlot)
      .map(([, id]) => id);

    return equipments.filter(eq => 
      eq.slots.includes(activeSlot) &&
      eq.shipLimits.includes(selectedShip) &&
      !equippedIds.includes(eq.id)
    );
  }, [activeSlot, selectedShip, equipped, equipments]);

  const combinedStats = useMemo(() => {
    const map: Record<string, { baseName: string, type: number, value: number, order: number }> = {};
    let orderCounter = 0;
    
    [1, 2, 3, 4, 5, 6].forEach(slot => {
      const eqId = equipped[slot];
      if (eqId === undefined) return;
      const eq = equipments.find(e => e.id === eqId);
      if (!eq) return;
      eq.attrs.forEach(attr => {
        const key = `${attr.baseName}_${attr.type}`;
        if (!map[key]) {
          map[key] = { baseName: attr.baseName, type: attr.type, value: 0, order: orderCounter++ };
        }
        map[key].value += attr.value;
      });
    });

    return Object.values(map)
      .filter(stat => Math.abs(parseFloat(stat.value.toFixed(4))) > 0)
      .sort((a,b) => a.order - b.order)
      .map(stat => {
        const sumSign = Math.sign(stat.value);
        const bSign = buffSignMap[stat.baseName] || sumSign; 
        
        const isBuff = (sumSign === bSign);
        const suffix = isBuff ? '+' : '-';
        const name = `${stat.baseName}${suffix}`;
        
        return {
          name,
          isBuff,
          type: stat.type,
          value: stat.value
        };
      });
  }, [equipped, equipments, buffSignMap]);

  return (
    <div className="bg-zinc-950 text-zinc-300 font-sans min-h-screen p-4 md:p-8 selection:bg-emerald-500/30">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 md:gap-10">
        
        {/* Header */}
        <header className="border-b border-zinc-800 pb-6 mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">WOWSBlitz Calculator</h1>
            <p className="text-zinc-500 text-sm md:text-base mt-2">The list only includes Standard Lv3 equipment.</p>
          </div>
          <button 
            onClick={() => setViewMode(viewMode === 'configurator' ? 'equipList' : 'configurator')}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg text-sm transition-colors border border-zinc-700 hover:border-zinc-600 whitespace-nowrap"
          >
            {viewMode === 'configurator' ? 'Equip List' : 'Calculator'}
          </button>
        </header>

        {viewMode === 'equipList' ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-2xl shadow-sm">
               <div className="flex-1 flex flex-col gap-3">
                 <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Filter by Slot</span>
                 <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setListSlotFilter(null)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${listSlotFilter === null ? 'bg-zinc-200 text-black shadow' : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-700/50 hover:text-white'}`}
                    >All</button>
                    {[1,2,3,4,5,6].map(slot => (
                      <button 
                        key={slot}
                        onClick={() => setListSlotFilter(slot)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${listSlotFilter === slot ? 'bg-zinc-200 text-black shadow' : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-700/50 hover:text-white'}`}
                      >Slot 0{slot}</button>
                    ))}
                 </div>
               </div>
               <div className="w-px bg-zinc-800/80 hidden md:block"></div>
               <div className="flex-1 flex flex-col gap-3">
                 <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Filter by Class</span>
                 <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setListShipFilter(null)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${listShipFilter === null ? 'bg-zinc-200 text-black shadow' : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-700/50 hover:text-white'}`}
                    >All</button>
                    {([1,2,3,4] as ShipType[]).map(ship => (
                      <button 
                        key={ship}
                        onClick={() => setListShipFilter(ship)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${listShipFilter === ship ? 'bg-zinc-200 text-black shadow' : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-700/50 hover:text-white'}`}
                      >{shipNames[ship].split('(')[1].replace(')', '')}</button>
                    ))}
                 </div>
               </div>
            </div>

            <section className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
               <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-zinc-300">
                     <thead className="bg-zinc-950 text-zinc-500 border-b border-zinc-800 text-xs uppercase tracking-widest">
                        <tr>
                           <th className="px-6 py-4 font-medium whitespace-nowrap">ID</th>
                           <th className="px-6 py-4 font-medium whitespace-nowrap">Slots</th>
                           <th className="px-6 py-4 font-medium whitespace-nowrap">Ship Limit</th>
                           <th className="px-6 py-4 font-medium">Attributes</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-zinc-800/50">
                        {filteredEquipmentsList.map(eq => (
                         <tr key={eq.id} className="hover:bg-zinc-800/60 even:bg-zinc-800/20 transition-colors">
                            <td className="px-6 py-5 font-bold text-white whitespace-nowrap">#{eq.id}</td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="flex gap-1.5 flex-wrap">
                                {eq.slots.map(s => <span key={s} className="px-2 py-0.5 bg-zinc-800 rounded text-xs">Slot 0{s}</span>)}
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap text-zinc-400">
                              <div className="flex gap-1.5 flex-wrap">
                                {eq.shipLimits.map(s => <span key={s} className="px-2 py-0.5 border border-zinc-800 rounded text-xs">{shipNames[s as ShipType].split('(')[1].replace(')', '')}</span>)}
                              </div>
                            </td>
                            <td className="px-6 py-5">
                               <div className="flex flex-wrap gap-2">
                                  {eq.attrs.map((attr, idx) => (
                                     <div key={idx} className="flex items-center text-xs gap-2 px-2.5 py-1.5 bg-zinc-950/50 border border-zinc-800 rounded-lg">
                                       <span className="text-zinc-400 font-medium whitespace-nowrap">{attr.rawName}</span>
                                       <span className={`font-bold shrink-0 ${attr.isBuff ? 'text-emerald-400' : 'text-red-400'}`}>
                                         {formatValue(attr.value, attr.type)}
                                       </span>
                                     </div>
                                  ))}
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
               </div>
            </section>
          </div>
        ) : (
          <>
            {/* 1. SHIP SELECTION */}
            <section>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">1. Select Class</div>
          <div className="flex flex-wrap gap-3">
            {([1,2,3,4] as ShipType[]).map(id => (
               <button 
                 key={id}
                 className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                   selectedShip === id 
                     ? 'bg-white text-black shadow-md scale-105' 
                     : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800'
                 }`}
                 onClick={() => handleShipSelect(id)}
               >
                  {shipNames[id]}
               </button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* 2. SLOTS */}
            <section>
               <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">2. Equipment Slots</div>
               <div className="grid grid-cols-3 gap-3 md:gap-4">
                  { [1,2,3,4,5,6].map(slot => {
                      const isFilled = equipped[slot] !== undefined;
                      const isActive = activeSlot === slot;
                      
                      return (
                        <button 
                          key={slot} 
                          onClick={() => handleSlotSelect(slot)}
                          className={`aspect-[4/3] rounded-2xl flex flex-col items-center justify-center transition-all border ${
                             isActive ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 ring-4 ring-emerald-500/10' :
                             isFilled ? 'border-zinc-700 bg-zinc-800 hover:border-zinc-600 text-white' : 
                             'border-zinc-800 border-dashed bg-zinc-900/50 hover:bg-zinc-900 text-zinc-500 hover:text-zinc-400'
                          }`}
                        >
                           <span className="text-[10px] md:text-xs uppercase font-semibold tracking-wider mb-1 opacity-80">Slot {slot}</span>
                           {isFilled ? (
                              <span className="font-bold text-lg md:text-xl">#{equipped[slot]}</span>
                           ) : (
                              <span className="text-xs">Empty</span>
                           )}
                        </button>
                      )
                  }) }
               </div>
            </section>

            {/* AVAILABLE EQUIPMENT */}
            {activeSlot !== null && selectedShip !== null && (
              <section className="bg-zinc-900/80 border border-zinc-800 text-zinc-300 rounded-3xl overflow-hidden flex flex-col shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
                 <div className="p-5 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50">
                    <span className="text-sm md:text-base font-semibold text-white">Compatible Equipment <span className="text-zinc-500 ml-2 font-normal">(Slot {activeSlot})</span></span>
                    <button onClick={() => setActiveSlot(null)} className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-300 px-2 py-1 transition-colors">Close</button>
                 </div>
                 
                 {equipped[activeSlot] && (
                   <div className="p-4 border-b border-zinc-800">
                      <button 
                        onClick={() => handleUnequip(activeSlot)}
                        className="w-full py-3 rounded-xl bg-red-500/10 text-red-500 font-semibold text-sm hover:bg-red-500/20 transition-colors"
                      >
                         Unequip module #{equipped[activeSlot]}
                      </button>
                   </div>
                 )}

                 <div className="max-h-[500px] overflow-y-auto p-4 md:p-5 flex flex-col gap-3">
                    {availableEquipments.length === 0 ? (
                       <div className="py-12 text-center text-sm font-medium text-zinc-600">No compatible equipment found.</div>
                    ) : (
                       availableEquipments.map(eq => (
                          <button 
                            key={eq.id} 
                            onClick={() => handleEquip(eq.id)} 
                            className="w-full text-left bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 rounded-2xl p-4 md:p-5 transition-all flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between group shadow-sm hover:shadow-md"
                          >
                             <div className="font-bold text-white text-base md:text-lg shrink-0 group-hover:text-emerald-400 transition-colors">
                               Equip #{eq.id}
                             </div>
                             <div className="flex flex-wrap gap-2 w-full xl:justify-end">
                                {eq.attrs.map((attr, idx) => (
                                   <div key={idx} className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium flex-1 sm:flex-none flex justify-between sm:justify-start items-center gap-3 ${attr.isBuff ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' : 'bg-red-500/10 text-red-400 border border-red-500/10'}`}>
                                      <span className="opacity-90">{attr.baseName}</span>
                                      <span className="font-bold shrink-0">{formatValue(attr.value, attr.type)}</span>
                                   </div>
                                ))}
                             </div>
                          </button>
                       ))
                    )}
                 </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-4">
            {/* SUMMARY PANEL */}
            <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 sticky top-8 shadow-xl">
               <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-4 mb-4">Net Attributes</div>
               
               <div className="flex flex-col gap-1">
                 {Object.keys(equipped).length === 0 ? (
                    <div className="py-12 text-center text-zinc-600 font-medium text-sm">
                      Select equipment to see stat changes.
                    </div>
                 ) : combinedStats.length === 0 ? (
                    <div className="py-6 text-zinc-500 text-sm font-medium">Effects negate each other exactly.</div>
                 ) : (
                    combinedStats.map((stat, idx) => {
                       const displayName = stat.name.replace(/[+-]$/, '');
                       return (
                         <div key={idx} className="flex justify-between items-center py-3 border-b border-zinc-800/60 last:border-0 hover:bg-zinc-800/30 px-2 -mx-2 rounded transition-colors">
                            <span className="text-sm font-medium text-zinc-300 pr-4">{displayName}</span>
                            <span className={`text-sm font-bold shrink-0 text-right ${stat.isBuff ? 'text-emerald-400' : 'text-red-400'}`}>
                              {formatValue(stat.value, stat.type)}
                            </span>
                         </div>
                       );
                    })
                 )}
               </div>
            </section>
          </div>

        </div>
        </>
        )}
      </div>
    </div>
  );
}
