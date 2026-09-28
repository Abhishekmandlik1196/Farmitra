

export default function CropCalendar() {
  const seasons = [
    { name: 'Kharif', months: 'June - October', color: 'bg-green-500', crops: ['Rice', 'Maize', 'Soybean', 'Cotton', 'Bajra', 'Jowar', 'Tur Dal', 'Moong', 'Urad', 'Groundnut'] },
    { name: 'Rabi', months: 'October - March', color: 'bg-orange-500', crops: ['Wheat', 'Barley', 'Mustard', 'Gram', 'Peas', 'Lentil', 'Potato', 'Oats', 'Linseed'] },
    { name: 'Zaid', months: 'March - June', color: 'bg-blue-500', crops: ['Watermelon', 'Muskmelon', 'Cucumber', 'Bitter Gourd', 'Pumpkin', 'Moong (summer)'] }
  ]

  return (
    <div className="space-y-4 lg:space-y-6">
      

      <div className="space-y-4 lg:space-y-6">
        {seasons.map((season) => (
          <div key={season.name} className="card">
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-3 h-3 rounded-full ${season.color}`}></span>
              <h3 className="font-semibold text-lg">{season.name} Season</h3>
              <span className="text-sm text-gray-500 ml-auto">{season.months}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {season.crops.map((crop) => (
                <div key={crop} className="p-2 rounded-lg bg-gray-50 text-center">
                  <span className="text-lg"></span>
                  <p className="text-xs font-medium mt-1">{crop}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 p-2 rounded-lg bg-blue-50">
              <p className="text-xs text-blue-800">
                Recommended sowing time for your region (Guna, MP) for {season.name} season: Based on last 10 year weather data
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
