<View style={{ flex: 7 }}>
              {show()}
              <View style={{ flex: 6, backgroundColor: 'white', marginVertical: 3, paddingHorizontal: 10 }}>
                return (
                <View key={item.id_keranjang_detail} style={{ flexDirection: 'row', marginVertical: 10 }}>
                  <View style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 10, marginRight: 10, justifyContent: 'center' }}>
                    <Image source={require('../../../../../assets/images/auth-new.png')} style={{ width: 50, height: 50 }} />
                  </View>
                  <View style={styles.barang}>
                    <Text style={{ color: 'black', fontSize: 16 }}>
                      {item.produk.nama_produk}
                    </Text>
                    <Text style={{ color: 'gray', fontSize: 12 }}>
                      Per Strip
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={{ color: 'black', fontSize: 16 }}>
                      {item.produk.harga_produk}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: colors.backgroundEmpty,
                          padding: 5,
                          borderRadius: 100,
                        }}
                        onPress={() => {
                          removeKeranjangProduk(item.id_keranjang_detail);
                        }}>
                        <Icon
                          name="trash"
                          style={{ color: 'black', fontSize: 20 }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                        tambahKeranjang(item.id_keranjang_detail)
                      }} style={[styles.viewOperator, { marginLeft: 10 }]}>
                        <Text style={styles.textViewOperator}>+</Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 10,
                        }}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>
                          {item.qty}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => {
                        kurangKeranjang(item.id_keranjang_detail);
                      }} style={[styles.viewOperator, { marginLeft: 10 }]}>
                        <Text style={styles.textViewOperator}>-</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                )
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <TouchableOpacity
                  style={styles.btnKeranjang}
                  onPress={() => {
                    navigation.navigate(Navigasi.TOKO_KESEHATAN_PRODUK);
                  }}>
                  <Text style={styles.textBtnKeranjang}>
                    + Tambah Keranjang Lagi
                  </Text>
                </TouchableOpacity>
              </View>
            </View>