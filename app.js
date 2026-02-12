// Profit Calculator
(function() {
    'use strict';

    // DOM Elements
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

    // Format currency
    function formatCurrency(amount) {
        return '$' + amount.toFixed(2);
    }

    // Format percentage
    function formatPercent(value) {
        return value.toFixed(2) + '%';
    }

    // Calculate profit
    function calculate() {
        const costPrice = parseFloat(costPriceInput.value);
        const sellingPrice = parseFloat(sellingPriceInput.value);

        if (isNaN(costPrice) || isNaN(sellingPrice) || costPrice < 0 || sellingPrice < 0) {
            alert('Please enter valid cost and selling prices.');
            return;
        }

        const profit = sellingPrice - costPrice;
        const margin = costPrice > 0 ? (profit / sellingPrice) * 100 : 0;
        const markup = costPrice > 0 ? (profit / costPrice) * 100 : 0;

        // Update displays
        if (profit > 0) {
            profitValue.textContent = '+' + formatCurrency(profit);
            profitValue.className = 'result-value profit';
            profitLabel.textContent = 'Profit';
            status.textContent = '📈 Profit';
            status.style.color = 'var(--success)';
        } else if (profit < 0) {
            profitValue.textContent = formatCurrency(profit);
            profitValue.className = 'result-value loss';
            profitLabel.textContent = 'Loss';
            status.textContent = '📉 Loss';
            status.style.color = 'var(--danger)';
        } else {
            profitValue.textContent = '$0.00';
            profitValue.className = 'result-value';
            profitLabel.textContent = 'Break Even';
            status.textContent = '⚖️ Break Even';
            status.style.color = 'var(--text-primary)';
        }

        revenue.textContent = formatCurrency(sellingPrice);
        margin.textContent = formatPercent(margin);
        markup.textContent = formatPercent(markup);

        // Show results
        resultsContainer.style.display = 'block';
    }

    // Clear all
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

    // Event listeners
    calculateBtn.addEventListener('click', calculate);
    clearBtn.addEventListener('click', clearAll);

    // Allow Enter key to calculate
    [costPriceInput, sellingPriceInput].forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                calculate();
            }
        });
    });

    // Focus first input
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => costPriceInput.focus());
    } else {
        costPriceInput.focus();
    }
})();
