// Profit Calculator
(function() {
    'use strict';

    const costPriceInput = document.getElementById('cost-price');
    const sellingPriceInput = document.getElementById('selling-price');
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultsContainer = document.getElementById('results-container');
    const profitValue = document.getElementById('profit-value');
    const profitLabel = document.getElementById('profit-label');
    const revenue = document.getElementById('revenue');
    const margin = document.getElementById('margin');
    const markup = document.getElementById('markup');
    const status = document.getElementById('status');

    function formatCurrency(amount) {
        return '$' + amount.toFixed(2);
    }

    function formatPercent(value) {
        return value.toFixed(2) + '%';
    }

    function calculate() {
        const costPrice = parseFloat(costPriceInput.value);
        const sellingPrice = parseFloat(sellingPriceInput.value);

        if (isNaN(costPrice) || isNaN(sellingPrice) || costPrice < 0 || sellingPrice < 0) {
            alert('Please enter valid cost and selling prices.');
            return;
        }

        const profit = sellingPrice - costPrice;
        const marginPercent = costPrice > 0 ? (profit / sellingPrice) * 100 : 0;
        const markupPercent = costPrice > 0 ? (profit / costPrice) * 100 : 0;

        profitValue.textContent = formatCurrency(profit);
        profitValue.className = 'result-value';

        if (profit > 0) {
            profitValue.classList.add('profit');
            profitLabel.textContent = 'Profit';
            status.textContent = '📈 Profit';
            status.style.color = 'var(--success)';
        } else if (profit < 0) {
            profitValue.classList.add('loss');
            profitLabel.textContent = 'Loss';
            status.textContent = '📉 Loss';
            status.style.color = 'var(--danger)';
        } else {
            profitValue.classList.remove('profit', 'loss');
            profitLabel.textContent = 'Break Even';
            status.textContent = '⚖️ Break Even';
            status.style.color = 'var(--text-primary)';
        }

        revenue.textContent = formatCurrency(sellingPrice);
        margin.textContent = formatPercent(marginPercent);
        markup.textContent = formatPercent(markupPercent);

        resultsContainer.style.display = 'block';
    }

    function clearAll() {
        costPriceInput.value = '';
        sellingPriceInput.value = '';
        resultsContainer.style.display = 'none';
        profitValue.textContent = '--';
        profitValue.className = 'result-value';
        profitLabel.textContent = '--';
        revenue.textContent = '--';
        margin.textContent = '--';
        markup.textContent = '--';
        status.textContent = '--';
        status.style.color = 'var(--text-primary)';
        costPriceInput.focus();
    }

    calculateBtn.addEventListener('click', calculate);
    clearBtn.addEventListener('click', clearAll);

    [costPriceInput, sellingPriceInput].forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                calculate();
            }
        });
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => costPriceInput.focus());
    } else {
        costPriceInput.focus();
    }
})();
