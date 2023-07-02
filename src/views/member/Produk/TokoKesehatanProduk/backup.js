<FlatList
          data={produk}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardProduk}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(Navigasi.DETAIL_PRODUK);
                }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require('../../../../assets/images/auth-new.png')}
                    resizeMode="cover"
                    style={{ width: 150, height: 150 }}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.namaProduk}>{item.nama_produk}</Text>
              <Text style={styles.hargaProduk}>{item.harga_produk}</Text>
              {item.count == 0 ? (
                item.qty == 0 ? (
                  <View style={styles.viewQtyTidakTersedia}>
                    <Text style={styles.textQtyTidakTersedia}>
                      Maaf, Produk Tidak Tersedia
                    </Text>
                  </View>
                ) : (
                  <View style={styles.buttonProduk}>
                    <TouchableOpacity
                      onPress={() => tambahKeranjang(item.id)}
                      style={{ alignItems: 'center' }}>
                      <Text
                        style={{
                          color: 'purple',
                          padding: 5,
                        }}>
                        Tambah
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              ) : (
                <View style={styles.countKosong}>
                  <TouchableOpacity onPress={() => incrementProduct(item.id)}>
                    <View style={styles.buttonOperator}>
                      <Text style={{ color: 'black', fontSize: 16 }}>+</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.viewTextOperator}>
                    <Text
                      style={{
                        color: 'purple',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      {item.count}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => decrementProduct(item.id)}>
                    <View style={[styles.buttonOperator, { marginLeft: 10 }]}>
                      <Text style={{ color: 'black', fontSize: 16 }}>-</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />