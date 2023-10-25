import { useState, useEffect, useCallback } from "react";
import { Form, Table, Button, Dropdown } from "semantic-ui-react";

const DEFAULT_CURRENCIES = ["USD", "AUD", "CAD", "INR"];

export default function CurrencyExchange() {
  const [baseCurrency, setBaseCurrency] = useState("INR");
  const [additionalCurrencies, setAdditionalCurrencies] =
    useState(DEFAULT_CURRENCIES);
  const [exchangeRates, setExchangeRates] = useState(null);

  const handleButtonClick = useCallback(() => {
    if (baseCurrency && additionalCurrencies.length) {
      const additionalCurrenciesWithoutBase = additionalCurrencies.filter(
        (currency) => currency !== baseCurrency
      );
      const apiEndpoints = additionalCurrenciesWithoutBase.map(
        (currency) =>
          `https://api.apilayer.com/exchangerates_data/convert?from=${baseCurrency}&to=${currency}&amount=1`
      );
      const myHeaders = new Headers();
      myHeaders.append("apikey", "kI4eE1H4lVneqCgGLY4IEr04xdOuyy9e");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      Promise.all(
        apiEndpoints.map((apiEndpoint) => fetch(apiEndpoint, requestOptions))
      )
        .then((responses) =>
          Promise.all(responses.map((response) => response.json()))
        )
        .then((results) => {
          const exchangeRates = {};
          additionalCurrencies.forEach((currency1, index) => {
            exchangeRates[currency1] = {};
            additionalCurrencies.forEach((currency2, innerIndex) => {
              const resultValue =
                innerIndex < results.length
                  ? results[innerIndex].result
                  : "N/A";
              exchangeRates[currency1][currency2] =
                currency1 === currency2 ? "1" : resultValue;
            });
          });
          setExchangeRates(exchangeRates);
        })
        .catch((error) => console.log("error", error));
    }
  }, [baseCurrency, additionalCurrencies]);
  console.log("Exchange rate", exchangeRates);
  useEffect(() => {
    handleButtonClick();
  }, [handleButtonClick]);

  return (
    <div>
      <Form>
        <Form.Field>
          <label>Select Base Currency</label>
          <Dropdown
            selection
            options={[
              { key: "USD", text: "USD", value: "USD" },
              { key: "EUR", text: "EUR", value: "EUR" },
              { key: "GBP", text: "GBP", value: "GBP" },
              { key: "INR", text: "INR", value: "INR" },
            ]}
            value={baseCurrency}
            onChange={(e, { value }) => setBaseCurrency(value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Select Additional Currencies</label>
          <Dropdown
            selection
            multiple
            options={[
              { key: "USD", text: "USD", value: "USD" },
              { key: "AUD", text: "AUD", value: "AUD" },
              { key: "CAD", text: "CAD", value: "CAD" },
              { key: "EUR", text: "EUR", value: "EUR" },
              { key: "GBP", text: "GBP", value: "GBP" },
              { key: "INR", text: "INR", value: "INR" },
            ]}
            value={additionalCurrencies}
            onChange={(e, { value }) => setAdditionalCurrencies(value)}
          />
        </Form.Field>
      </Form>

      {exchangeRates && (
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              {additionalCurrencies.map((currency) => (
                <Table.HeaderCell key={currency}>{currency}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {additionalCurrencies.map((currency1) => (
              <Table.Row key={currency1}>
                <Table.Cell>{currency1}</Table.Cell>
                {additionalCurrencies.map((currency2) => (
                  <Table.Cell key={currency1 + "-" + currency2}>
                    {exchangeRates[currency1][currency2]}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      <Button
        basic
        content="Update exchange rate"
        icon="refresh"
        onClick={handleButtonClick}
      />
    </div>
  );
}
