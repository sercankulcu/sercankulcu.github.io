# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 29 slides: Time Series Analysis and Forecasting — trend, seasonality, '
             'stationarity, ARIMA, deep forecasting, history and neighboring courses.'),
    gundem=['Trend and season', 'Stationarity', 'ARIMA and smoothing', 'Deep forecasting', 'Evaluation', 'Neighboring courses'],
    tanim=('Time series analysis studies measurements whose order matters: yesterday\'s value affects today\'s. The course '
           'teaches how to split a series into trend, seasonality and noise, how to model <b>autocorrelation</b>, and how '
           'to forecast the future together with its uncertainty.'),
    tarihce=[
        ('1927', 'Yule explains sunspot numbers with an autoregressive (AR) model.'),
        ('1960', 'The Kalman filter is published: it estimates a hidden state step by step from noisy measurements.'),
        ('1970', 'Box and Jenkins\'s book establishes ARIMA models and how to build them.'),
        ('1982', 'Engle proposes the ARCH model, in which volatility changes over time.'),
        ('1997', 'Hochreiter and Schmidhuber introduce the LSTM; long dependencies become learnable.'),
        ('2017', 'Facebook open-sources Prophet, which separates seasonality and holidays.'),
    ],
    kavramlar=[
        ('Trend and seasonality', 'Long-run direction and regularly repeating cycles.'),
        ('Stationarity', 'Mean and variance do not change over time.'),
        ('Autocorrelation (ACF)', 'Correlation of a series with its own past.'),
        ('Differencing', 'Removing the trend to make a series stationary.'),
        ('ARIMA', 'Autoregression, differencing and moving average together.'),
        ('Exponential smoothing', 'A forecast that weights the recent past more.'),
        ('Prediction interval', 'A forecast with its uncertainty, not a single number.'),
        ('Time-based split', 'The test set always comes after training; no shuffling.'),
    ],
    akis=[('Visualize', 'plots,\ndecomposition'), ('Transform', 'differencing,\nlogarithm'), ('Choose model', 'ACF, PACF,\nAIC'),
          ('Rolling\nvalidation', 'time-based\nsplit'), ('Forecast', 'point and\ninterval')],
    akis_ornek=('<b>Example:</b> A power company plots hourly consumption, separates the daily and weekly cycles, builds '
                'a model that also takes temperature as input, backtests it on past weeks, and gives the next day\'s '
                'load with a 95% prediction interval.'),
    onkosul_ek=[
        ('Calculus', 'series, derivatives and integrals: the language of models and filters', None),
        ('Programming', 'reading files, handling dates and plotting in Python', '/teaching/computer-and-introduction-to-programming/?lang=en'),
    ],
    ayrisma=[
        ('OI', 'Statistics usually assumes independent observations; this course deals with ordered data whose observations depend on each other.'),
        ('SSI', 'Signal processing filters a signal and looks at its frequencies; this course uses the same tools to forecast the future.'),
        ('DO', 'Deep learning offers a powerful family of forecasting models; this course also teaches when a simple model is enough.'),
        ('MO', 'ML shuffles examples and splits them at random; here time order is kept and the model is trained only on the past.'),
    ],
    uygulamalar=[
        ('Demand forecasting', 'Planning sales, stock and production.'),
        ('Energy load', 'Power consumption and renewable output.'),
        ('Finance', 'Volatility, risk and return models.'),
        ('Weather and climate', 'Temperature, rainfall and CO₂ series.'),
        ('Anomaly detection', 'Deviations in server and sensor metrics.'),
        ('Economics', 'Forecasting inflation, unemployment and growth.'),
    ],
    araclar=['pandas', 'statsmodels', 'Prophet', 'sktime', 'Darts', 'R forecast / fable'],
    veriler=['Airline passengers (Box-Jenkins)', 'Sunspot numbers', 'M4 and M5 competitions', 'UCI Electricity Load Diagrams',
             'Mauna Loa CO₂ measurements', 'Jena climate data'],
    yanilgilar=[
        ('Time series data can be tested with a random split.', 'Future values leak into training; testing always follows time order.'),
        ('Deep networks beat classic models on every series.', 'In the M competitions, simple and statistical methods have often been very strong.'),
        ('A good model gives one correct number.', 'Forecasts are uncertain; for decisions the <b>prediction interval</b> matters at least as much as the point forecast.'),
        ('A model that worked in the past always works.', 'Structural breaks (a pandemic, a crisis) change the series; models must be monitored and refreshed.'),
    ],
    meslekler=['Forecasting analyst', 'Data scientist', 'Quantitative analyst', 'Demand planner', 'Energy data analyst'],
    sonra=('After this course you can move on to frequency analysis with signal processing, transformer-based forecasting '
           'with deep learning, and multitemporal satellite images with remote sensing. Econometrics and state space '
           'models are natural next steps too.'),
    kaynaklar=[
        'Hyndman and Athanasopoulos, <em>Forecasting: Principles and Practice</em>, 3rd ed., OTexts, 2021.',
        'Box, Jenkins, Reinsel and Ljung, <em>Time Series Analysis: Forecasting and Control</em>, 5th ed., Wiley, 2015.',
        'Shumway and Stoffer, <em>Time Series Analysis and Its Applications</em>, 4th ed., Springer, 2017.',
        'Brockwell and Davis, <em>Introduction to Time Series and Forecasting</em>, 3rd ed., Springer, 2016.',
    ],
    islenenler=[
        'Components of a series: trend, seasonality, noise',
        'Visualization and STL decomposition',
        'Stationarity, differencing and unit root tests',
        'Autocorrelation and partial autocorrelation',
        'Exponential smoothing and Holt-Winters',
        'AR, MA and ARMA models',
        'ARIMA and seasonal ARIMA (SARIMA)',
        'Regression with external regressors, dynamic models',
        'Forecast evaluation and rolling-origin validation',
        'Volatility models: ARCH and GARCH',
        'State space models and the Kalman filter',
        'Forecasting with machine learning and deep nets',
    ],
    beceriler=[
        'date-indexed data in pandas',
        'fitting ARIMA with statsmodels',
        'Prophet and sktime',
        'designing rolling-origin validation',
        'producing and reading prediction intervals',
    ],
    hazirlik=[
        ('Can you explain mean, variance and the correlation coefficient?', '@OI'),
        ('Can you fit a linear regression and interpret its coefficients?', '@MO'),
        ('Can you compute the sum of a geometric series?', 'Sequences and series from calculus'),
        ('Can you read a CSV file with a date column in Python and plot it?', 'An intro programming course, then a short pandas tutorial'),
    ],
    riskler=[
        ('Leaking the future', 'A random split, or scaling with statistics of the whole series, carries future values into training; test scores become fake.'),
        ('Structural breaks', 'In the 2020 pandemic, demand and traffic series changed overnight; models that fit the past well were wrong for weeks.'),
        ('Forecasts without intervals', 'A single number suggests certainty; stock or energy decisions get made without knowing the uncertainty.'),
        ('Forecasts that change behavior', 'When everyone acts on the same price or demand forecast, the series moves; a forecast can fulfill or defeat itself.'),
    ],
)
