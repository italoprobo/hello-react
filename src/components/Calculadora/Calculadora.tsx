import React, { useState } from 'react';
import './Calculadora.css';

// Componente de Entrada de Milhas
const MilesInput: React.FC<{
  miles: number;
  pricePerMilheiro: number;
  discount: number;
  bonusPercentage: number;
  onMilesChange: (miles: number) => void;
  onPricePerMilheiroChange: (price: number) => void;
  onDiscountChange: (discount: number) => void;
  onBonusPercentageChange: (percentage: number) => void;
}> = ({
  miles,
  pricePerMilheiro,
  discount,
  bonusPercentage,
  onMilesChange,
  onPricePerMilheiroChange,
  onDiscountChange,
  onBonusPercentageChange,
}) => {
    const [bonusInputValue, setBonusInputValue] = useState(bonusPercentage);


    const decreaseMiles = (amount: number) => {
      onMilesChange(Math.max(0, miles - amount));
    };

    const increaseMiles = (amount: number) => {
      onMilesChange(miles + amount);
    };

    const applyBonus = () => {
      onBonusPercentageChange(bonusInputValue);
    };

    return (
      <div>
        <h5>Milhas</h5>
        <div className="miles-input">
          <button onClick={() => decreaseMiles(10000)}>-10k</button>
          <button onClick={() => decreaseMiles(1000)}>-1k</button>
          <input
            type="number"
            value={miles}
            onChange={(e) => onMilesChange(Number(e.target.value))}
          />
          <button onClick={() => increaseMiles(1000)}>+1k</button>
          <button onClick={() => increaseMiles(10000)}>+10k</button>
        </div>

        <h5>Preço milheiro</h5>
        <input
          type="number"
          value={pricePerMilheiro}
          onChange={(e) => onPricePerMilheiroChange(Number(e.target.value))}
        />

        <h5>Desconto (%)</h5>
        <input
          type="number"
          value={discount}
          onChange={(e) => onDiscountChange(Number(e.target.value))}
        />

        <h5>Bônus (%)</h5>
        <div className="bonus-input">
          <input
            type="number"
            value={bonusInputValue}
            onChange={(e) => setBonusInputValue(Number(e.target.value))}
          />
          <div>
            <button onClick={() => setBonusInputValue(80)}>80%</button>
            <button onClick={() => setBonusInputValue(100)}>100%</button>
            <button onClick={() => setBonusInputValue(150)}>150%</button>
            <button onClick={() => setBonusInputValue(200)}>200%</button>
            <button onClick={() => setBonusInputValue(300)}>300%</button>
            <button onClick={applyBonus}>Calcular</button>
          </div>
        </div>
      </div>
    );
  };

const Calculadora: React.FC = () => {
  const [miles, setMiles] = useState(0);
  const [pricePerMilheiro, setPricePerMilheiro] = useState(70);
  const [discount, setDiscount] = useState(0);
  const [bonusPercentage, setBonusPercentage] = useState(0);

  const calculateDiscountedPricePerMilheiro = () => {
    return pricePerMilheiro * (1 - discount / 100);
  };

  const calculateTotalMilesWithBonus = () => {
    const bonusMiles = (miles / 100) * bonusPercentage;
    return miles + bonusMiles;
  };

  return (
    <div className="calculator">

      <MilesInput
        miles={miles}
        pricePerMilheiro={pricePerMilheiro}
        discount={discount}
        bonusPercentage={bonusPercentage}
        onMilesChange={setMiles}
        onPricePerMilheiroChange={setPricePerMilheiro}
        onDiscountChange={setDiscount}
        onBonusPercentageChange={setBonusPercentage}
      />

      <div>
        <strong>Milhas:</strong> {miles} milhas
      </div>

      <div>
        <strong>Milhas com Bônus:</strong> {calculateTotalMilesWithBonus()} milhas
      </div>

      <div>
        <strong>Valor por Milheiro (com desconto):</strong> R${' '}
        {calculateDiscountedPricePerMilheiro().toFixed(2)}
      </div>

    </div>
  );
};

export default Calculadora;
